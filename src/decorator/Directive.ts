import { injectAll, $inject, replace, DecoratorFn } from '../shared/util';
import { IDirective } from 'angular';

const type = 'directive';

export function Directive(config: DirectiveConfig = {}): DecoratorFn {
  return function(target: any): any {
    target.$stDirectiveName =
      replace(type, config.selector, 'selector') ??
      replace(type, target.name, 'name');
    $inject(target, config.inject);
    if (!target.prototype.compile) {
      target.prototype.compile = () => {};
    }
    const originalCompile = target.prototype.compile;
    const linkFunction = target.prototype.link;
    transformCompile(target.prototype, function(): () => any {
      return function(): any {
        const origin = originalCompile.apply(this, arguments);
        if (linkFunction) {
          return linkFunction.bind(this);
        } else {
          return origin;
        }
      };
    });
    target.$stType = type;
    transformProperties(target.prototype, {
      controllerAs: config.controllerAs,
      bindToController: config.bindToController,
      multiElement: config.multiElement,
      priority: config.priority,
      replace: config.replace,
      require: config.require,
      restrict: config.restrict,
      scope: config.scope,
      template: config.template,
      templateNamespace: config.templateNamespace,
      templateUrl: config.templateUrl,
      terminal: config.terminal,
      transclude: config.transclude,
    });
    return injectAll(target);
  };
}

function transformCompile(
  prototype: any,
  callback: (...args: any[]) => any
): void {
  prototype.compile = callback(prototype.compile);
}

function transformProperties(
  prototype: any,
  properties: { [name: string]: any }
): void {
  for (const key in properties) {
    if (properties[key]) prototype[key] = properties[key];
  }
}

export interface DirectiveConfig
  extends Omit<Partial<IDirective>, 'controller' | 'compile' | 'link'> {
  selector?: string;
  inject?: any[];
}

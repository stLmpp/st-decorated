import { injectAll, $inject, replace } from "../shared/util";
import { IAttributes } from 'angular';

const type = 'directive';

export function Directive(config: DirectiveConfig = {}){
  return function(target: any){
    target.$stDirectiveName = replace(type, config.selector, 'selector') || replace(type, target.name, 'name');
    $inject(target, config.inject);
    if (!target.prototype.compile){
      target.prototype.compile = () => {};
    }
    const originalCompile = target.prototype.compile;
    const linkFunction = target.prototype.link;
    transformCompile(target.prototype, function(){
      return function(){
        let origin = originalCompile.apply(this, arguments);
        if (linkFunction){
          return linkFunction.bind(this);
        } else {
          return origin;
        }
      }
    });
    target.$stType = type;
    transformProperties(target.prototype, 
      {
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
        transclude: config.transclude
      }
    )
    return injectAll(target);
  }
}

function transformCompile(prototype: any, callback: Function){
  prototype.compile = callback(prototype.compile);
}

function transformProperties(prototype: any, properties: {[name: string]: any}){
  for(let key in properties){
    if (properties[key]) prototype[key] = properties[key];
  }
}

export interface DirectiveConfig {
  selector?: string;
  inject?: any[];
  controllerAs?: string;
  bindToController?: boolean | {
    [boundProperty: string]: string
  };
  multiElement?: boolean;
  priority?: number;
  replace?: boolean;
  require?: string | string[] | {
    [controller: string]: string
  };
  restrict?: string;
  scope?: boolean | {
    [boundProperty: string]: string
  };
  template?: string | ((tElement: JQLite, tAttrs: IAttributes) => string);
  templateNamespace?: string;
  templateUrl?: string | ((tElement: JQLite, tAttrs: IAttributes) => string);
  terminal?: boolean;
  transclude?: boolean | 'element' | {
    [slot: string]: string
  };
}
import { IComponentOptions } from 'angular';
import { $inject, DecoratorFn, injectAll, replace } from '../shared/util';

const type = 'component';

export function Component({
  bindings,
  controllerAs,
  inject,
  providers,
  require,
  selector,
  template,
  templateUrl,
  transclude,
}: ComponentConfig = {}): DecoratorFn {
  return function(target: any): any {
    $inject(target, inject, providers);
    const component: IComponentOptions = {
      controller: injectAll(target),
      bindings,
      template,
      controllerAs,
      require,
      transclude,
      templateUrl,
    };
    if (
      !component.template &&
      !component.templateUrl &&
      target.$templateResolver
    ) {
      component.template = target.$templateResolver;
    }
    target.$stComponent = component;
    target.$stComponentName =
      replace(type, selector, 'selector') ?? replace(type, target.name, 'name');
    target.$stType = type;
    return target.$stComponent.controller;
  };
}

export interface ComponentConfig
  extends Omit<Partial<IComponentOptions>, 'controller'> {
  selector?: string;
  inject?: any[];
  providers?: any[];
}

import { IComponentOptions } from 'angular';
import { Util } from '../shared/util';

const type = 'component';

export function Component(config: ComponentConfig = {}){
  return function(target: any){
    Util.$inject(target, config.inject, config.providers);
    let component: IComponentOptions = {
      controller: Util.injectAll(target),
      bindings: config.bindings,
      template: config.template,
      controllerAs: config.controllerAs,
      require: config.require,
      transclude: config.transclude,
      templateUrl: config.templateUrl
    }
    target.$stComponent = component;
    target.$stComponentName = Util.replace(type, config.selector, 'selector') || Util.replace(type, target.name, 'name');
    return target.$stComponent.controller;
  }
}

export interface ComponentConfig {
  selector?: string;
  inject?: string[];
  providers?: string[];
  bindings?: {
    [binding: string]: string
  };
  template?: string;
  controllerAs?: string;
  require?: {
    [name: string]: string
  };
  transclude?: boolean;
  templateUrl?: string;
}
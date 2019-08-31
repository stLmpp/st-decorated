import { IComponentOptions, Injectable } from 'angular';
import { $inject, injectAll, replace } from '../shared/util';

const type = 'component';

export function Component(config: ComponentConfig = {}){
  return function(target: any){
    $inject(target, config.inject, config.providers);
    let component: IComponentOptions = {
      controller: injectAll(target),
      bindings: config.bindings,
      template: config.template,
      controllerAs: config.controllerAs,
      require: config.require,
      transclude: config.transclude,
      templateUrl: config.templateUrl
    }
    if (!component.template && !component.templateUrl && target.$templateResolver){
      component.template = target.$templateResolver;
    }
    target.$stComponent = component;
    target.$stComponentName = replace(type, config.selector, 'selector') || replace(type, target.name, 'name');
    target.$stType = type;
    return target.$stComponent.controller;
  }
}

export interface ComponentConfig {
  selector?: string;
  inject?: any[];
  providers?: any[];
  bindings?: {
    [boundProperty: string]: string
  };
  template?: string | Injectable<(...args: any[]) => string>;
  controllerAs?: string;
  require?: {
    [controller: string]: string
  };
  transclude?: boolean | {
    [slot: string]: string
  };
  templateUrl?: string | Injectable<(...args: any[]) => string>;
}
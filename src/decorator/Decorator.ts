import { $inject, injectAll } from "../shared/util";

export function Decorator(config: DecoratorConfig){
  return function(target: any){
    target.$stDecoratedName = config.decorated;
    $inject(target, config.inject);
    target.$stType = 'decorator';
    return injectAll(target);
  }
}

export interface DecoratorConfig {
  decorated: string;
  inject?: any[];
}

export interface IDecorator {
  $decorate($delegate: any): any;
}
import { Util } from "../shared/util";

export function Decorator(config: DecoratorConfig){
  return function(target: any){
    target.$stDecoratedName = config.decorated;
    Util.$inject(target, config.inject);
    return Util.injectAll(target);
  }
}

export interface DecoratorConfig {
  decorated: string;
  inject?: string[];
}

export interface IDecorator {
  $decorate($delegate: any): any;
}
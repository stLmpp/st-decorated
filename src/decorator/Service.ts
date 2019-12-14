import { $inject, DecoratorFn, injectAll } from '../shared/util';

export function Service({
  global,
  inject,
  name,
  providers,
}: ServiceConfig = {}): DecoratorFn {
  return function(target: any): any {
    target.$stName = name ?? target.name;
    target.$stType = 'service';
    $inject(target, inject, providers);
    target = injectAll(target);
    const origin = target;
    target.$stFactory = function(): any {
      return origin;
    };
    if (global === true) {
      window.$stDecorate.globalProviders.push(target);
    }
    return target;
  };
}

export interface ServiceConfig {
  inject?: any[];
  name?: string;
  providers?: any[];
  global?: boolean;
}

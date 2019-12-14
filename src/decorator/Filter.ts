import { $inject, DecoratorFn, injectAll } from '../shared/util';

export function Filter({ inject, name }: FilterConfig = {}): DecoratorFn {
  return function(target: any): any {
    target.$stName = name ?? target.name;
    target.$stType = 'filter';
    $inject(target, inject);
    target = injectAll(target);
    return target;
  };
}

export interface FilterConfig {
  name?: string;
  inject?: any[];
}

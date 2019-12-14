import { $inject, DecoratorFn, injectAll } from '../shared/util';

export function Factory({ inject, name }: FactoryConfig = {}): DecoratorFn {
  return function(target: any): any {
    target.$stName = name ?? target.name;
    $inject(target, inject);
    target.$stType = 'factory';
    return injectAll(target);
  };
}

export interface FactoryConfig {
  name?: string;
  inject?: any[];
}

import { $inject, DecoratorFn, injectAll } from '../shared/util';

export function Provider({ inject, name }: ProviderConfig = {}): DecoratorFn {
  return function(target: any): any {
    target.$stName = name ?? target.name;
    inject = inject ?? [];
    $inject(target, inject);
    target.$stType = 'provider';
    return injectAll(target);
  };
}

export interface ProviderConfig {
  name?: string;
  inject?: any[];
}

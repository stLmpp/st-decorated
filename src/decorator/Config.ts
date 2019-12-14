import { $inject, DecoratorFn, injectAll } from '../shared/util';

export function Config(...injections: any[]): DecoratorFn {
  return function(target: any): any {
    injections = injections ?? [];
    $inject(target, injections);
    target.$stType = 'config';
    return injectAll(target, '$execute');
  };
}

export interface IConfig {
  $execute(): void;
}

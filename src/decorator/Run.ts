import { $inject, DecoratorFn, injectAll } from '../shared/util';

export function Run(...injections: any[]): DecoratorFn {
  return function(target: any): any {
    $inject(target, injections ?? []);
    target.$stType = 'run';
    return injectAll(target, '$execute');
  };
}

export interface IRun {
  $execute(): void;
}

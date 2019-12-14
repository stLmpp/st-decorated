import { $inject, DecoratorFn, injectAll } from '../shared/util';

export function Decorator({ decorated, inject }: DecoratorConfig): DecoratorFn {
  return function(target: any): any {
    target.$stDecoratedName = decorated;
    $inject(target, inject);
    target.$stType = 'decorator';
    return injectAll(target);
  };
}

export interface DecoratorConfig {
  decorated: string;
  inject?: any[];
}

export interface IDecorator {
  $decorate($delegate: any): any;
}

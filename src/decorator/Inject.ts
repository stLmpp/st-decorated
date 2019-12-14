import { $inject, DecoratorFn } from '../shared/util';

export function Inject(...injections: any[]): DecoratorFn {
  return function(
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ): any {
    injections = injections ?? [];
    if (descriptor) {
      $inject(descriptor.value, injections);
    } else {
      $inject(target, injections);
    }
  };
}

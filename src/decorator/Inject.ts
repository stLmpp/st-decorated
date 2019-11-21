import { $inject } from "../shared/util";

export function Inject(...injections: any[]){
  return function(target: any, key: string, descriptor: PropertyDescriptor){
    injections = injections ?? [];
    if (descriptor) {
      $inject(descriptor.value, injections);
    } else {
      $inject(target, injections);
    }
  }
}

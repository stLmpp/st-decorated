export function Inject(...injections: any[]){
  return function(target: any, key: string, descriptor: PropertyDescriptor){
    injections = injections || [];
    if (descriptor) {
      descriptor.value.$inject = injections;
    } else {
      target.$inject = injections;
    }
  }
}
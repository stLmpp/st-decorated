import { $inject, injectAll } from "../shared/util";

export function Config(...injections: any[]){
  return function(target: any){
    injections = injections ?? [];
    $inject(target, injections);
    target.$stType = 'config';
    return injectAll(target, '$execute');
  }
}

export interface IConfig {
  $execute(): void;
}

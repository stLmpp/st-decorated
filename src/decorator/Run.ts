import { $inject, injectAll } from "../shared/util";

export function Run(...injections: any[]){
  return function(target: any){
    $inject(target, injections || []);
    target.$stType = 'run';
    return injectAll(target, '$execute');
  }
}

export interface IRun {
  $execute(): void;
}
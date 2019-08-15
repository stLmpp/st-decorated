import { Util } from "../shared/util";

export function Run(...injections: string[]){
  return function(target: any){
    Util.$inject(target, injections || []);
    target.$stType = 'run';
    return Util.injectAll(target, '$execute');
  }
}

export interface IRun {
  $execute(): void;
}
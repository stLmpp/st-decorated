import { Util } from "../shared/util";

export function Config(...injections: string[]){
  return function(target: any){
    injections = injections || [];
    Util.$inject(target, injections.map(inject => {
      if (!/Provider$/.test(inject)) {
        inject += 'Provider';
      }
      return inject;
    }));
    return Util.injectAll(target, '$execute');
  }
}

export interface IConfig {
  $execute(): void;
}
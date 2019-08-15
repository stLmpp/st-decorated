import { Util } from "../shared/util";

export function Factory(config: FactoryConfig = {}){
  return function(target: any){
    target.$stName = config.name || target.name;
    Util.$inject(target, config.inject, config.providers);
    target.$stType = 'factory';
    return Util.injectAll(target);
  }
}

export interface FactoryConfig {
  name?: string;
  inject?: string[];
  providers?: string[];
}
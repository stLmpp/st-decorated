import { Util } from "../shared/util";

export function Factory(config: FactoryConfig = {}){
  return function(target: any){
    target.$stFactoryName = config.name || target.name;
    Util.$inject(target, config.inject);
  }
}

export interface FactoryConfig {
  name?: string;
  inject?: string[];
}
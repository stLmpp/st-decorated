import { $inject, injectAll } from "../shared/util";

export function Factory(config: FactoryConfig = {}){
  return function(target: any){
    target.$stName = config.name ?? target.name;
    $inject(target, config.inject);
    target.$stType = 'factory';
    return injectAll(target);
  }
}

export interface FactoryConfig {
  name?: string;
  inject?: any[];
}

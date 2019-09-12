import { $inject, injectAll } from "../shared/util";

export function Provider(config: ProviderConfig = {}){
  return function(target: any){
    target.$stName = config.name || target.name;
    config.inject = config.inject || [];
    $inject(target, config.inject);
    target.$stType = 'provider';
    return injectAll(target);
  }
}

export interface ProviderConfig {
  name?: string;
  inject?: any[];
}
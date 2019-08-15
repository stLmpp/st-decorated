import { Util } from "../shared/util";
import { isUndefined } from 'angular';

export function Service(config: ServiceConfig = {}){
  return function(target: any){
    if (isUndefined(config.global)) config.global = true;
    target.$stName = config.name || target.name;
    target.$stType = 'service';
    Util.$inject(target, config.inject, config.providers);
    target = Util.injectAll(target);
    if (config.nonSingleton){
      const origin = target;
      target.$stNonSingleton = true;
      target.$stFactory = function(){
        return origin;
      }
      window.$stDecorate.nonSingletons.push(target.$stName);
    }
    if (config.global){
      window.$stDecorate.globalProviders.push(target);
    }
    return target;
  }
}

export interface ServiceConfig {
  inject?: string[];
  name?: string;
  nonSingleton?: boolean;
  providers?: string[];
  global?: boolean;
}
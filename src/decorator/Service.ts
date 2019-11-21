import { $inject, injectAll } from "../shared/util";

export function Service(config: ServiceConfig = {}){
  return function(target: any){
    target.$stName = config.name ?? target.name;
    target.$stType = 'service';
    $inject(target, config.inject, config.providers);
    target = injectAll(target);
    const origin = target;
    target.$stFactory = function(){
      return origin;
    };
    if (config.global === true){
      window.$stDecorate.globalProviders.push(target);
    }
    return target;
  }
}

export interface ServiceConfig {
  inject?: any[];
  name?: string;
  providers?: any[];
  global?: boolean;
}

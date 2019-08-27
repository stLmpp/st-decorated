import { $inject, injectAll } from "../shared/util";

export function Filter(config: FilterConfig = {}){
  return function(target: any){
    target.$stName = config.name || target.name;
    target.$stType = 'filter';
    $inject(target, config.inject);
    target = injectAll(target);
    return target;
  }
}

export interface FilterConfig {
  name?: string;
  inject?: any[];
}
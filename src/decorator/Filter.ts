import { Util } from "../shared/util";

export function Filter(config: FilterConfig = {}){
  return function(target: any){
    target.$stName = config.name || target.name;
    Util.$inject(target, config.inject);
    target.$stType = 'filter';
    return Util.injectAll(target);
  }
}

export interface FilterConfig {
  name?: string;
  inject?: string[];
}
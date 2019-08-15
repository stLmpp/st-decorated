import { Util } from "../shared/util";

export function Filter(config: FilterConfig = {}){
  return function(target: any){
    target.$stName = config.name || target.name;
    target.$stType = 'filter';
    Util.$inject(target, config.inject);
    target = Util.injectAll(target);
    return target;
  }
}

export interface FilterConfig {
  name?: string;
  inject?: string[];
}
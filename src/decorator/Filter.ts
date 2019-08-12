import { Util } from "../shared/util";

export function Filter(config: FilterConfig = {}){
  return function(target: any){
    target.$stFilterName = config.name || target.name;
    Util.$inject(target, config.inject);
    return Util.injectAll(target);
  }
}

export interface FilterConfig {
  name?: string;
  inject?: string[];
}
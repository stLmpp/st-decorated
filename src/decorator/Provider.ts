import { Util } from "../shared/util";

export function Provider(config: ProviderConfig = {}){
  return function(target: any){
    target.$stProviderName = config.name || target.name;
    config.inject = config.inject = [];
    Util.$inject(target, config.inject);
    return Util.injectAll(target);
  }
}

export interface ProviderConfig {
  name?: string;
  inject?: string[];
}

export interface IProvider {
  $get(...injections: string[]): any;
}
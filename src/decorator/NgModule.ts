import { module, bootstrap, isString, noop,  } from 'angular';

export function NgModule(config: NgModuleConfig = {}){
  return function(target: any){
    target.$stModuleName = config.module || target.name;
    config.imports = config.imports || [];
    let mod = module(target.$stModuleName, config.imports.map(dep => {
      if (!isString(dep)) dep = dep.$stModuleName;
      return dep;
    }));
    let ic = config.configs ? config.configs.length : 0;
    while(ic--) {
      mod.config(config.configs[ic]);
    }
    let idec = config.decorators ? config.decorators.length : 0;
    while(idec--){
      const decoratorDef = config.decorators[idec];
      const decorateFn = function($injector: any, $delegate: any){
        let instance = $injector.instantiate(decoratorDef);
        if (!instance.$decorate){
          console.warn(`Decorator "${decoratorDef.$stDecoratedName}" does not have the $decorate method`)
          return $delegate;
        }
        return instance.$decorate.call(instance, $delegate);
      }
      const decoratorArr = ['$injector', '$delegate', decorateFn];
      mod.decorator(decoratorDef.$stDecoratedName, decoratorArr);
    }
    if (config.routing) {
      mod.config(config.routing);
    }
    let is = config.providers ? config.providers.length : 0;
    while(is--){
      const service = config.providers[is];
      if (service.$stServiceName) {
        if (service.$stNonSingleton) {
          mod.factory(`${service.$stServiceName}NonSingleton`, service);
          mod.service(service.$stServiceName, service());
        } else {
          mod.service(service.$stServiceName, service);
        }
      } else if (service.$stFactoryName){
        const factoryName = service.$stFactoryName;
        const factoryFn = (...args: any) => new service(...args);
        const factory = [...service.$inject, factoryFn];
        mod.factory(factoryName, factory);
      }
    }
    let id = config.declarations ? config.declarations.length : 0;
    while(id--){
      const component = config.declarations[id];
      if (component.$stDirectiveName) mod.directive(component.$stDirectiveName, () => new component);
      else mod.component(component.$stComponentName, component.$stComponent);
    }
    let iv = config.values ? config.values.length : 0;
    while(iv--){
      const value = config.values[iv];
      mod.value(value.name, value.value);
    }
    let ico = config.constants ? config.constants.length : 0;
    while(ico--){
      const constant = config.constants[ico];
      mod.constant(constant.name, constant.value);
    }
    let ifi = config.filters ? config.filters.length : 0;
    while(ifi--){
      const filterDef = config.filters[ifi];
      const filterFn = function($injector: any){
        let instance = $injector.instantiate(filterDef);
        if (!instance.$transform){
          console.error(`Filter "${filterDef.$stFilterName}" does not have a $transform method`);
          return noop();
        }
        return instance.$transform.bind(instance);
      }
      mod.filter(filterDef.$stFilterName, ['$injector', filterFn]);
    }
    let ir = config.run ? config.run.length : 0;
    while(ir--){
      const run = config.run[ir];
      mod.run(run);
    }
    if (config.bootstrap) {
      bootstrap(config.bootstrap.element, [target.$stModuleName], {
        strictDi: !!config.bootstrap.strictDi
      });
    }
  }
}

export interface NgModuleConfig {
  module?: string;
  imports?: any[];
  configs?: Function[];
  routing?: Function;
  providers?: any[];
  declarations?: any[];
  decorators?: any[];
  values?: IConstant[];
  constants?: IConstant[];
  filters?: any[];
  run?: any[];
  bootstrap?: {
    element: HTMLElement;
    strictDi?: boolean;
  }
}

export interface IConstant {
  name: string;
  value: any;
}

export interface RouteConfig {

}
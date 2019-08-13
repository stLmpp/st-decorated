import camelCase from 'lodash/camelCase';

export class Util {
  static injectNg(injectables: any[], inject: Inject[], scope: any){
    for(let i = 0, len = injectables.length; i < len; i++){
      let inj = inject[i],
      isNonSingleton = window.$stDecorate.nonSingletons.includes(inj.inject);
      if (inj.providedIn === 'local' && isNonSingleton) scope[inj.inject] = new injectables[i]();
      else scope[inj.inject] = injectables[i];
    }
  }
  static injectAll(target: any, executeMethod?: string){
    let util = this;
    return class extends target {
      constructor(...args: any){
        super(...args);
        const inject = [
          ...target.$stInject.map((o: string) => ({inject: o, providedIn: 'global'})),
          ...target.$stProviders.map((o: string) => ({inject: o, providedIn: 'local'}))
        ];
        util.injectNg(args, inject, this);
        if (executeMethod && this[executeMethod]) this[executeMethod]();
      }
    }
  }
  static $inject(target: any, inject: string[], providers: string[] = []){
    target.$stInject = inject || [];
    target.$stProviders = providers;
    target.$inject = [...target.$stInject, ...target.$stProviders.map((o: string) => `${o}NonSingleton`)];
  }
  static replace(what: WhatModule, name: string, type: TypeName){
    if (type === 'name'){
      const reg = new RegExp(`(?=(?!^[${what}$])(?=.*${what}$))`, 'i');
      if (reg.test(name)) name = name.replace(new RegExp(what, 'i'), '');
      
      name = name.replace(/^\w/, str => str.toLowerCase());
    }
    return camelCase(name);
  }
}

type WhatModule = 'component' | 'directive';
type TypeName = 'selector' | 'name';

export interface Inject {
  inject: string;
  providedIn: 'global' | 'local';
}
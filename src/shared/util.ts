import camelCase from 'lodash/camelCase';
import { element, isString } from 'angular';

export class Util {
  static injectNg(injectables: any[], inject: Inject[], scope: any){
    const $injector = element(window.$stDecorate.bootstrapedEl).injector();
    for(let i = 0, len = injectables.length; i < len; i++){
      let inj = inject[i],
      isNonSingleton = window.$stDecorate.nonSingletons.includes(inj.inject);
      if (inj.providedIn === 'local' && isNonSingleton) {
        scope[inj.inject] = $injector.instantiate(injectables[i]);
      }
      else scope[inj.inject] = injectables[i];
    }
  }
  static injectAll(target: any, executeMethod?: string){
    let util = this;
    const className = target.name;
    let c = 
      class extends target {
        constructor(...args: any){
          super(...args);
          const inject: Inject[] = [
            ...util.transformInjectables(target.$stInject),
            ...util.transformInjectables(target.$stProviders, 'local')
          ];
          util.injectNg(args, inject, this);
          if (executeMethod && this[executeMethod]) this[executeMethod]();
        }
      }
    Object.defineProperty(c, 'name', {value: className});
    return c;
  }
  static $inject(target: any, inject: any[] = [], providers: any[] = []){
    target.$stInject = inject;
    target.$stProviders = providers;
    target.$inject = [
      ...this.transformInjectableString(target.$stInject), 
      ...this.transformInjectableString(target.$stProviders, 'local')
    ];
  }
  static getInjectableName(inject: any, providedIn: ProvidedIn, useNonSingleton: boolean = true): string {
    let injectabledName = '';
    if (!isString(inject)){
      injectabledName = inject.$stName;
      if (inject.$stType === 'filter'){
        injectabledName += 'Filter';
      }
    } else injectabledName = inject;
    if (providedIn === 'local' && useNonSingleton) injectabledName += 'NonSingleton';
    return injectabledName;
  }
  static getInjectabledType(inject: any, providedIn: ProvidedIn): Inject{
    return { inject: this.getInjectableName(inject, providedIn, false), providedIn };
  }
  static transformInjectables(injectArr: any[], providedIn: ProvidedIn = 'global'): Inject[]{
    return injectArr.map(inject => {
      return this.getInjectabledType(inject, providedIn);
    })
  }
  static transformInjectableString(injectArr: any[], providedIn: ProvidedIn = 'global'): string[]{
    return injectArr.map(inject => {
      return this.getInjectableName(inject, providedIn);
    })
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
type ProvidedIn = 'global' | 'local';

export interface Inject {
  inject: string;
  providedIn: ProvidedIn;
}
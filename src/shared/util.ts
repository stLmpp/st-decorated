import camelCase from 'lodash/camelCase';
import { element, isString, module, IModule } from 'angular';

export function injectNg(
  injectables: any[],
  inject: Inject[],
  scope: any
): void {
  const $injector = element(window.$stDecorate.bootstrapedEl).injector();
  for (let i = 0, len = injectables.length; i < len; i++) {
    const inj = inject[i];
    if (inj.providedIn === 'local') {
      scope[inj.inject] = $injector.instantiate(injectables[i]);
    } else scope[inj.inject] = injectables[i];
  }
}

export function injectAll(target: any, executeMethod?: string): any {
  const className = target.name;
  const c = class extends target {
    constructor(...args: any) {
      super(...args);
      const inject: Inject[] = [
        ...transformInjectables(target.$stInject),
        ...transformInjectables(target.$stProviders, 'local'),
      ];
      injectNg(args, inject, this);
      if (executeMethod && this[executeMethod]) this[executeMethod]();
    }
  };
  Object.defineProperty(c, 'name', { value: className });
  return c;
}

export function $inject(
  target: any,
  inject: any[] = [],
  providers: any[] = []
): void {
  target.$stInject = inject;
  target.$stProviders = providers;
  target.$inject = [
    ...transformInjectableString(target.$stInject),
    ...transformInjectableString(target.$stProviders, 'local'),
  ];
}

function getInjectableName(
  inject: any,
  providedIn: ProvidedIn,
  useNonSingleton: boolean = true
): string {
  let injectabledName: string;
  if (!isString(inject)) {
    injectabledName = inject.$stName;
    if (inject.$stType === 'filter') {
      injectabledName += 'Filter';
    }
  } else injectabledName = inject;
  if (providedIn === 'local' && useNonSingleton) {
    injectabledName = $dict.nonSingletonFn(injectabledName);
  }
  return injectabledName;
}

function getInjectabledType(inject: any, providedIn: ProvidedIn): Inject {
  return { inject: getInjectableName(inject, providedIn, false), providedIn };
}

function transformInjectables(
  injectArr: any[],
  providedIn: ProvidedIn = 'global'
): Inject[] {
  return injectArr.map(inject => {
    return getInjectabledType(inject, providedIn);
  });
}

function transformInjectableString(
  injectArr: any[],
  providedIn: ProvidedIn = 'global'
): string[] {
  return injectArr.map(inject => {
    return getInjectableName(inject, providedIn);
  });
}

export function replace(
  what: WhatModule,
  name: string,
  type: TypeName
): string {
  if (type === 'name') {
    const reg = new RegExp(`(?=(?!^[${what}$])(?=.*${what}$))`, 'i');
    if (reg.test(name)) name = name.replace(new RegExp(what, 'i'), '');

    name = name.replace(/^\w/, str => str.toLowerCase());
  }
  return camelCase(name);
}

type WhatModule = 'component' | 'directive';
type TypeName = 'selector' | 'name';
type ProvidedIn = 'global' | 'local';

export interface Inject {
  inject: string;
  providedIn: ProvidedIn;
}

export const $dict: {
  nonSingleton: string;
  nonSingletonFn: (name: string) => string;
} = {
  nonSingleton: '$stDecoratedNonSingleton',
  nonSingletonFn: (name: string) => $dict.nonSingleton + name,
};

export function declareModule(
  name: string,
  imports: string[]
): { module: IModule; name: string } {
  try {
    module(name);
    return declareModule(`${name}#`, imports);
  } catch (ex) {
    const mod = module(name, imports);
    return { module: mod, name };
  }
}

export type DecoratorFn = (
  target: any,
  key?: string,
  propertyDescriptor?: PropertyDescriptor
) => any;

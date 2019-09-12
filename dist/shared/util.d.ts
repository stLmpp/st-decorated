import { IModule } from 'angular';
export declare function injectNg(injectables: any[], inject: Inject[], scope: any): void;
export declare function injectAll(target: any, executeMethod?: string): {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export declare function $inject(target: any, inject?: any[], providers?: any[]): void;
export declare function replace(what: WhatModule, name: string, type: TypeName): string;
declare type WhatModule = 'component' | 'directive';
declare type TypeName = 'selector' | 'name';
declare type ProvidedIn = 'global' | 'local';
export interface Inject {
    inject: string;
    providedIn: ProvidedIn;
}
export declare const $dict: {
    nonSingleton: string;
    nonSingletonFn: (name: string) => string;
};
export declare function declareModule(name: string, imports: string[]): {
    module: IModule;
    name: string;
};
export {};

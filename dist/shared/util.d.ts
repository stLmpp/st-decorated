export declare class Util {
    static injectNg(injectables: any[], inject: Inject[], scope: any): void;
    static injectAll(target: any, executeMethod?: string): {
        new (...args: any): {
            [x: string]: any;
        };
        [x: string]: any;
    };
    static $inject(target: any, inject?: any[], providers?: any[]): void;
    static getInjectableName(inject: any, providedIn: ProvidedIn, useNonSingleton?: boolean): string;
    static getInjectabledType(inject: any, providedIn: ProvidedIn): Inject;
    static transformInjectables(injectArr: any[], providedIn?: ProvidedIn): Inject[];
    static transformInjectableString(injectArr: any[], providedIn?: ProvidedIn): string[];
    static replace(what: WhatModule, name: string, type: TypeName): string;
}
declare type WhatModule = 'component' | 'directive';
declare type TypeName = 'selector' | 'name';
declare type ProvidedIn = 'global' | 'local';
export interface Inject {
    inject: string;
    providedIn: ProvidedIn;
}
export {};

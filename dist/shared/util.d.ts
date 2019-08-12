export declare class Util {
    static injectNg(injectables: any[], inject: Inject[], scope: any): void;
    static injectAll(target: any, executeMethod?: string): {
        new (...args: any): {
            [x: string]: any;
        };
        [x: string]: any;
    };
    static $inject(target: any, inject: string[], providers?: string[]): void;
    static replace(what: WhatModule, name: string, type: TypeName): string;
}
declare type WhatModule = 'component' | 'directive';
declare type TypeName = 'selector' | 'name';
export interface Inject {
    inject: string;
    providedIn: 'global' | 'local';
}
export {};

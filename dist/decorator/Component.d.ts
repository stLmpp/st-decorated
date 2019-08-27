import { Injectable } from 'angular';
export declare function Component(config?: ComponentConfig): (target: any) => any;
export interface ComponentConfig {
    selector?: string;
    inject?: any[];
    providers?: any[];
    bindings?: {
        [boundProperty: string]: string;
    };
    template?: string | Injectable<(...args: any[]) => string>;
    controllerAs?: string;
    require?: {
        [controller: string]: string;
    };
    transclude?: boolean | {
        [slot: string]: string;
    };
    templateUrl?: string | Injectable<(...args: any[]) => string>;
}

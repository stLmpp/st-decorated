import { IAttributes } from 'angular';
export declare function Directive(config?: DirectiveConfig): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface DirectiveConfig {
    selector?: string;
    inject?: any[];
    controllerAs?: string;
    bindToController?: boolean | {
        [boundProperty: string]: string;
    };
    multiElement?: boolean;
    priority?: number;
    replace?: boolean;
    require?: string | string[] | {
        [controller: string]: string;
    };
    restrict?: string;
    scope?: boolean | {
        [boundProperty: string]: string;
    };
    template?: string | ((tElement: JQLite, tAttrs: IAttributes) => string);
    templateNamespace?: string;
    templateUrl?: string | ((tElement: JQLite, tAttrs: IAttributes) => string);
    terminal?: boolean;
    transclude?: boolean | 'element' | {
        [slot: string]: string;
    };
}

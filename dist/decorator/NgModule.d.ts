export declare function NgModule(config?: NgModuleConfig): (target: any) => void;
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
    };
}
export interface IConstant {
    name: string;
    value: any;
}
export interface RouteConfig {
}

export declare function NgModule(config?: NgModuleConfig<any>): (target: any) => void;
export interface NgModuleConfig<T> {
    module?: string;
    imports?: Array<string | T>;
    configs?: T[];
    routing?: T;
    providers?: T[];
    declarations?: T[];
    decorators?: T[];
    values?: IConstant[];
    constants?: IConstant[];
    run?: T[];
    bootstrap?: {
        element: HTMLElement;
        strictDi?: boolean;
    };
}
export interface IConstant {
    name: string;
    value: any;
}

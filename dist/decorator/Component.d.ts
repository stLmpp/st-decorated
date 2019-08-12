export declare function Component(config?: ComponentConfig): (target: any) => any;
export interface ComponentConfig {
    selector?: string;
    inject?: string[];
    providers?: string[];
    bindings?: {
        [binding: string]: string;
    };
    template?: string;
    controllerAs?: string;
    require?: {
        [name: string]: string;
    };
    transclude?: boolean;
    templateUrl?: string;
}

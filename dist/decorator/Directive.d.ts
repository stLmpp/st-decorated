export declare function Directive(config?: DirectiveConfig): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface DirectiveConfig {
    selector?: string;
    inject?: string[];
    providers?: string[];
}

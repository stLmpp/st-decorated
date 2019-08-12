export declare function Decorator(config: DecoratorConfig): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface DecoratorConfig {
    decorated: string;
    inject?: string[];
}
export interface IDecorator {
    $decorate($delegate: any): any;
}

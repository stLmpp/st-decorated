export declare function Factory(config?: FactoryConfig): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface FactoryConfig {
    name?: string;
    inject?: string[];
    providers?: string[];
}

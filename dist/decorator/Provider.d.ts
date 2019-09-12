export declare function Provider(config?: ProviderConfig): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface ProviderConfig {
    name?: string;
    inject?: any[];
}

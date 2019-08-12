export declare function Filter(config?: FilterConfig): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface FilterConfig {
    name?: string;
    inject?: string[];
}

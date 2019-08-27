export declare function Filter(config?: FilterConfig): (target: any) => any;
export interface FilterConfig {
    name?: string;
    inject?: any[];
}

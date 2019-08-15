export declare function Service(config?: ServiceConfig): (target: any) => any;
export interface ServiceConfig {
    inject?: string[];
    name?: string;
    nonSingleton?: boolean;
    providers?: string[];
    global?: boolean;
}

export declare function Service(config?: ServiceConfig): (target: any) => any;
export interface ServiceConfig {
    inject?: any[];
    name?: string;
    providers?: any[];
    global?: boolean;
}

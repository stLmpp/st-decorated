export declare function Factory(config?: FactoryConfig): (target: any) => void;
export interface FactoryConfig {
    name?: string;
    inject?: string[];
}

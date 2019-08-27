export declare function Config(...injections: any[]): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface IConfig {
    $execute(): void;
}

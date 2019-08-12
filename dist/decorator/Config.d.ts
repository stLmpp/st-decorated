export declare function Config(...injections: string[]): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface IConfig {
    $execute(): void;
}

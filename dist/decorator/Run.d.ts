export declare function Run(...injections: string[]): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface IRun {
    $execute(): void;
}

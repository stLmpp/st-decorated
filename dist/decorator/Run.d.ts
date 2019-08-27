export declare function Run(...injections: any[]): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface IRun {
    $execute(): void;
}

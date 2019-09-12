import { IDirective } from 'angular';
export declare function Directive(config?: DirectiveConfig): (target: any) => {
    new (...args: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export interface DirectiveConfig extends Omit<Partial<IDirective>, 'controller' | 'compile' | 'link'> {
    selector?: string;
    inject?: any[];
}

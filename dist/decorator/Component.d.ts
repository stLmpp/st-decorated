import { IComponentOptions } from 'angular';
export declare function Component(config?: ComponentConfig): (target: any) => any;
export interface ComponentConfig extends Omit<Partial<IComponentOptions>, 'controller'> {
    selector?: string;
    inject?: any[];
    providers?: any[];
}

declare global {
    interface Window {
        $stDecorate: StDecorate;
    }
}
export interface StDecorate {
    bootstrapedEl: HTMLElement;
    globalProviders: any[];
}
export * from './decorator/Decorator.module';

declare global {
    interface Window {
        $stDecorate: StDecorate;
    }
}
export interface StDecorate {
    nonSingletons?: string[];
    bootstrapedEl: HTMLElement;
    globalProviders: any[];
}
export * from './decorator/Decorator.module';

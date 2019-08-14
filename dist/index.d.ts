declare global {
    interface Window {
        $stDecorate: StDecorate;
    }
}
export interface StDecorate {
    nonSingletons?: string[];
    bootstrapedEl: HTMLElement;
}
export * from './decorator/Decorator.module';

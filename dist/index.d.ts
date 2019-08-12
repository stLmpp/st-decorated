declare global {
    interface Window {
        $stDecorate: StDecorate;
    }
}
export interface StDecorate {
    nonSingletons?: string[];
}
export * from './decorator/Decorator.module';

let $stDecorate = {
    nonSingletons: [],
    bootstrapedEl: document.documentElement,
    globalProviders: []
};
window.$stDecorate = $stDecorate;
export * from './decorator/Decorator.module';

declare global {
  interface Window {
    $stDecorate: StDecorate;
  }
}

let $stDecorate: StDecorate = {
  nonSingletons: [],
  bootstrapedEl: document.documentElement,
  globalProviders: []
}

window.$stDecorate = $stDecorate;

export interface StDecorate {
  nonSingletons?: string[];
  bootstrapedEl: HTMLElement;
  globalProviders: any[];
}

export * from './decorator/Decorator.module';
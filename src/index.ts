declare global {
  interface Window {
    $stDecorate: StDecorate;
  }
}

let $stDecorate: StDecorate = {
  nonSingletons: [],
  bootstrapedEl: document.documentElement
}

window.$stDecorate = $stDecorate;

export interface StDecorate {
  nonSingletons?: string[];
  bootstrapedEl: HTMLElement;
}

export * from './decorator/Decorator.module';
declare global {
  interface Window {
    $stDecorate: StDecorate;
  }
}

let $stDecorate: StDecorate = {
  bootstrapedEl: document.documentElement,
  globalProviders: []
};

window.$stDecorate = $stDecorate;

export interface StDecorate {
  bootstrapedEl: HTMLElement;
  globalProviders: any[];
}

export * from './decorator/Decorator.module';

declare global {
  interface Window {
    $stDecorate: StDecorate;
  }
}

window.$stDecorate = {
  bootstrapedEl: document.documentElement,
  globalProviders: [],
};

export interface StDecorate {
  bootstrapedEl: HTMLElement;
  globalProviders: any[];
}

export * from './decorator/Decorator.module';

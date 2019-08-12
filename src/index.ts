declare global {
  interface Window {
    $stDecorate: StDecorate;
  }
}

let $stDecorate: StDecorate = {
  nonSingletons: []
}

window.$stDecorate = $stDecorate;

export interface StDecorate {
  nonSingletons?: string[];
}

export * from './decorator/Decorator.module';
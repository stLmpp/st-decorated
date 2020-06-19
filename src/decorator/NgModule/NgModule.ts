import { bootstrap, isString } from 'angular';
import { declareModule, DecoratorFn } from '../../shared/util';
import { declareDecorators } from './Decorators';
import { declareProviders } from './Providers';
import { declareDeclarations } from './Declarations';
import { declareBase } from './Base';
import { declareConstants } from './Constants';

export function NgModule(config: NgModuleConfig = {}): DecoratorFn {
  return function(target: any): any {
    target.$stModuleName = config.module ?? target.name;
    target.$stType = 'module';
    config.imports = config.imports ?? [];
    const moduleInfo = declareModule(
      target.$stModuleName,
      config.imports.map(dep => {
        if (!isString(dep)) dep = dep.$stModuleName;
        return dep;
      })
    );
    if (moduleInfo.name !== target.$stModuleName) {
      target.$stModuleName = moduleInfo.name;
    }
    const mod = moduleInfo.module;
    declareBase(mod, config.configs, 'config');
    declareDecorators(mod, config.decorators);
    if (config.routing) mod.config(config.routing);
    config.providers = config.providers ?? [];
    if (config.bootstrap) {
      config.providers.push(...window.$stDecorate.globalProviders);
    }
    declareProviders(mod, config.providers);
    declareDeclarations(mod, config.declarations);
    declareConstants(mod, config.values, 'value');
    declareConstants(mod, config.constants);
    declareBase(mod, config.run, 'run');
    if (config.bootstrap) {
      window.$stDecorate.bootstrapedEl = config.bootstrap.element;
      bootstrap(config.bootstrap.element, [target.$stModuleName], {
        strictDi: !!config.bootstrap.strictDi,
      });
    }
  };
}

export interface NgModuleConfig {
  module?: string;
  imports?: any[];
  configs?: any[];
  routing?: any;
  providers?: any[];
  declarations?: any[];
  decorators?: any[];
  values?: IConstant[];
  constants?: IConstant[];
  run?: any[];
  bootstrap?: NgModuleBootstrap;
}

export interface NgModuleBootstrap {
  element: HTMLElement;
  strictDi?: boolean;
}

export interface IConstant {
  name: string;
  value: any;
}

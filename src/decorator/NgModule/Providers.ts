import { IModule, noop } from 'angular';
import { $dict } from '../../shared/util';

export function declareProviders(mod: IModule, providers: any[]){
  let is = providers.length;
  for (let i = 0; i < is; i++){
    const provider = providers[i],
    type = provider.$stType;
    if (type === 'service') {
      mod.service(provider.$stName, provider);
      mod.factory($dict.nonSingletonFn(provider.$stName), provider.$stFactory);
    } else if (type === 'factory'){
      const factoryFn = function($injector: any){
        return $injector.instantiate(provider);
      };
      mod.factory(provider.$stName, ['$injector', factoryFn]);
    } else if (type === 'provider'){
      mod.provider(provider.$stName, provider);
    } else if (type === 'filter'){
      const filterFn = function($injector: any){
        let instance = $injector.instantiate(provider);
        if (!instance.$transform){
          console.error(`Filter "${provider.$stName}" does not have a $transform method`);
          return noop();
        }
        return instance.$transform.bind(instance);
      };
      mod.filter(provider.$stName, ['$injector', filterFn]);
    }
  }
}

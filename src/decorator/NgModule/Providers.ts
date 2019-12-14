import { IModule, noop } from 'angular';
import { $dict } from '../../shared/util';

export function declareProviders(mod: IModule, providers: any[]): void {
  const is = providers.length;
  for (let i = 0; i < is; i++) {
    const provider = providers[i];
    const type = provider.$stType;
    if (type === 'service') {
      mod.service(provider.$stName, provider);
      mod.factory($dict.nonSingletonFn(provider.$stName), provider.$stFactory);
    } else if (type === 'factory') {
      const factoryFn = function($injector: any): any {
        return $injector.instantiate(provider);
      };
      mod.factory(provider.$stName, ['$injector', factoryFn]);
    } else if (type === 'provider') {
      mod.provider(provider.$stName, provider);
    } else if (type === 'filter') {
      const filterFn = function($injector: any): any {
        const instance = $injector.instantiate(provider);
        if (!instance.$transform) {
          // tslint:disable-next-line:no-console
          console.error(
            `Filter "${provider.$stName}" does not have a $transform method`
          );
          return noop();
        }
        return instance.$transform.bind(instance);
      };
      mod.filter(provider.$stName, ['$injector', filterFn]);
    }
  }
}

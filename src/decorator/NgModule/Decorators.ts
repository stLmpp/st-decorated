import { IModule } from 'angular';

export function declareDecorators(mod: IModule, decorators: any[]): void {
  const idec = decorators?.length ?? 0;
  for (let i = 0; i < idec; i++) {
    const decoratorDef = decorators[i];
    const decorateFn = function($injector: any, $delegate: any): any {
      const instance = $injector.instantiate(decoratorDef);
      if (!instance.$decorate) {
        console.warn(
          `Decorator "${decoratorDef.$stDecoratedName}" does not have the $decorate method`
        );
        return $delegate;
      }
      return instance.$decorate.call(instance, $delegate);
    };
    const decoratorArr = ['$injector', '$delegate', decorateFn];
    mod.decorator(decoratorDef.$stDecoratedName, decoratorArr);
  }
}

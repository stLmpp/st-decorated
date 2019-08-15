import { module, bootstrap, isString, noop } from 'angular';
export function NgModule(config = {}) {
    return function (target) {
        target.$stModuleName = config.module || target.name;
        target.$stType = 'module';
        config.imports = config.imports || [];
        let mod = module(target.$stModuleName, config.imports.map(dep => {
            if (!isString(dep))
                dep = dep.$stModuleName;
            return dep;
        }));
        let ic = config.configs ? config.configs.length : 0;
        for (let i = 0; i < ic; i++)
            mod.config(config.configs[i]);
        let idec = config.decorators ? config.decorators.length : 0;
        for (let i = 0; i < idec; i++) {
            const decoratorDef = config.decorators[i];
            const decorateFn = function ($injector, $delegate) {
                let instance = $injector.instantiate(decoratorDef);
                if (!instance.$decorate) {
                    console.warn(`Decorator "${decoratorDef.$stDecoratedName}" does not have the $decorate method`);
                    return $delegate;
                }
                return instance.$decorate.call(instance, $delegate);
            };
            const decoratorArr = ['$injector', '$delegate', decorateFn];
            mod.decorator(decoratorDef.$stDecoratedName, decoratorArr);
        }
        if (config.routing)
            mod.config(config.routing);
        let is = config.providers ? config.providers.length : 0;
        for (let i = 0; i < is; i++) {
            const service = config.providers[i], type = service.$stType;
            if (type === 'service') {
                mod.service(service.$stName, service);
                if (service.$stNonSingleton) {
                    mod.factory(`${service.$stName}NonSingleton`, service.$stFactory);
                }
            }
            else if (type === 'factory') {
                const factoryFn = function ($injector) {
                    let instance = $injector.instantiate(service);
                    return instance;
                };
                mod.factory(service.$stName, ['$injector', factoryFn]);
            }
            else if (type === 'provider') {
                mod.provider(service.$stName, service);
            }
        }
        let id = config.declarations ? config.declarations.length : 0;
        for (let i = 0; i < id; i++) {
            const component = config.declarations[i], type = component.$stType;
            if (type === 'directive') {
                const directive = (...args) => new component(...args);
                const directiveArr = [...component.$inject, directive];
                mod.directive(component.$stDirectiveName, directiveArr);
            }
            else
                mod.component(component.$stComponentName, component.$stComponent);
        }
        let iv = config.values ? config.values.length : 0;
        for (let i = 0; i < iv; i++) {
            const value = config.values[i];
            mod.value(value.name, value.value);
        }
        let ico = config.constants ? config.constants.length : 0;
        for (let i = 0; i < ico; i++) {
            const constant = config.constants[i];
            mod.constant(constant.name, constant.value);
        }
        let ifi = config.filters ? config.filters.length : 0;
        for (let i = 0; i < ifi; i++) {
            const filterDef = config.filters[i];
            const filterFn = function ($injector) {
                let instance = $injector.instantiate(filterDef);
                if (!instance.$transform) {
                    console.error(`Filter "${filterDef.$stName}" does not have a $transform method`);
                    return noop();
                }
                return instance.$transform.bind(instance);
            };
            mod.filter(filterDef.$stName, ['$injector', filterFn]);
        }
        let ir = config.run ? config.run.length : 0;
        for (let i = 0; i < ir; i++) {
            mod.run(config.run[i]);
        }
        if (config.bootstrap) {
            window.$stDecorate.bootstrapedEl = config.bootstrap.element;
            bootstrap(config.bootstrap.element, [target.$stModuleName], {
                strictDi: !!config.bootstrap.strictDi
            });
        }
    };
}

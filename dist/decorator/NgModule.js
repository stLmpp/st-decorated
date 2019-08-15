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
        config.providers = config.providers || [];
        if (config.bootstrap)
            config.providers.push(...window.$stDecorate.globalProviders);
        let is = config.providers.length;
        for (let i = 0; i < is; i++) {
            const provider = config.providers[i], type = provider.$stType;
            if (type === 'service') {
                mod.service(provider.$stName, provider);
                if (provider.$stNonSingleton) {
                    mod.factory(`${provider.$stName}NonSingleton`, provider.$stFactory);
                }
            }
            else if (type === 'factory') {
                const factoryFn = function ($injector) {
                    let instance = $injector.instantiate(provider);
                    return instance;
                };
                mod.factory(provider.$stName, ['$injector', factoryFn]);
            }
            else if (type === 'provider') {
                mod.provider(provider.$stName, provider);
            }
            else if (type === 'filter') {
                const filterFn = function ($injector) {
                    let instance = $injector.instantiate(provider);
                    if (!instance.$transform) {
                        console.error(`Filter "${provider.$stName}" does not have a $transform method`);
                        return noop();
                    }
                    return instance.$transform.bind(instance);
                };
                mod.filter(provider.$stName, ['$injector', filterFn]);
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
        let ir = config.run ? config.run.length : 0;
        for (let i = 0; i < ir; i++) {
            mod.run(config.run[i]);
        }
        if (config.bootstrap) {
            console.log('BOOTSTRAP ROLANDO');
            window.$stDecorate.bootstrapedEl = config.bootstrap.element;
            bootstrap(config.bootstrap.element, [target.$stModuleName], {
                strictDi: !!config.bootstrap.strictDi
            });
        }
    };
}

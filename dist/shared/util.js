import camelCase from 'lodash/camelCase';
export class Util {
    static injectNg(injectables, inject, scope) {
        for (let i = 0, len = injectables.length; i < len; i++) {
            let inj = inject[i], isNonSingleton = window.$stDecorate.nonSingletons.includes(inj.inject);
            if (inj.providedIn === 'local' && isNonSingleton)
                scope[inj.inject] = new injectables[i]();
            else
                scope[inj.inject] = injectables[i];
        }
    }
    static injectAll(target, executeMethod) {
        let util = this;
        return class extends target {
            constructor(...args) {
                super(...args);
                const inject = [
                    ...target.$stInject.map((o) => ({ inject: o, providedIn: 'global' })),
                    ...target.$stProviders.map((o) => ({ inject: o, providedIn: 'local' }))
                ];
                util.injectNg(args, inject, this);
                if (executeMethod && this[executeMethod])
                    this[executeMethod]();
            }
        };
    }
    static $inject(target, inject, providers = []) {
        target.$stInject = inject || [];
        target.$stProviders = providers;
        target.$inject = [...target.$stInject, ...target.$stProviders.map((o) => `${o}NonSingleton`)];
    }
    static replace(what, name, type) {
        if (type === 'name') {
            const reg = new RegExp(`(?=(?!^[${what}$])(?=.*${what}$))`, 'i');
            if (reg.test(name))
                name = name.replace(new RegExp(what, 'i'), '');
            name = name.replace(/^\w/, str => str.toLowerCase());
        }
        return camelCase(name);
    }
}

import camelCase from 'lodash/camelCase';
import { element, isString } from 'angular';
export class Util {
    static injectNg(injectables, inject, scope) {
        const $injector = element(window.$stDecorate.bootstrapedEl).injector();
        for (let i = 0, len = injectables.length; i < len; i++) {
            let inj = inject[i], isNonSingleton = window.$stDecorate.nonSingletons.includes(inj.inject);
            if (inj.providedIn === 'local' && isNonSingleton) {
                scope[inj.inject] = $injector.instantiate(injectables[i]);
            }
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
                    ...util.transformInjectables(target.$stInject),
                    ...util.transformInjectables(target.$stProviders, 'local')
                ];
                util.injectNg(args, inject, this);
                if (executeMethod && this[executeMethod])
                    this[executeMethod]();
            }
        };
    }
    static $inject(target, inject = [], providers = []) {
        target.$stInject = inject;
        target.$stProviders = providers;
        target.$inject = [
            ...this.transformInjectableString(target.$stInject),
            ...this.transformInjectableString(target.$stProviders, 'local')
        ];
    }
    static getInjectableName(inject, providedIn, useNonSingleton = true) {
        let injectabledName = '';
        if (!isString(inject)) {
            injectabledName = inject.$stName;
            if (inject.$stType === 'filter') {
                injectabledName += 'Filter';
            }
        }
        else
            injectabledName = inject;
        if (providedIn === 'local' && useNonSingleton)
            injectabledName += 'NonSingleton';
        return injectabledName;
    }
    static getInjectabledType(inject, providedIn) {
        return { inject: this.getInjectableName(inject, providedIn, false), providedIn };
    }
    static transformInjectables(injectArr, providedIn = 'global') {
        return injectArr.map(inject => {
            return this.getInjectabledType(inject, providedIn);
        });
    }
    static transformInjectableString(injectArr, providedIn = 'global') {
        return injectArr.map(inject => {
            return this.getInjectableName(inject, providedIn);
        });
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

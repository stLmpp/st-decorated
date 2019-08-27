import camelCase from 'lodash/camelCase';
import { element, isString } from 'angular';
export function injectNg(injectables, inject, scope) {
    const $injector = element(window.$stDecorate.bootstrapedEl).injector();
    for (let i = 0, len = injectables.length; i < len; i++) {
        let inj = inject[i];
        if (inj.providedIn === 'local') {
            scope[inj.inject] = $injector.instantiate(injectables[i]);
        }
        else
            scope[inj.inject] = injectables[i];
    }
}
export function injectAll(target, executeMethod) {
    const className = target.name;
    let c = class extends target {
        constructor(...args) {
            super(...args);
            const inject = [
                ...transformInjectables(target.$stInject),
                ...transformInjectables(target.$stProviders, 'local')
            ];
            injectNg(args, inject, this);
            if (executeMethod && this[executeMethod])
                this[executeMethod]();
        }
    };
    Object.defineProperty(c, 'name', { value: className });
    return c;
}
export function $inject(target, inject = [], providers = []) {
    target.$stInject = inject;
    target.$stProviders = providers;
    target.$inject = [
        ...transformInjectableString(target.$stInject),
        ...transformInjectableString(target.$stProviders, 'local')
    ];
}
function getInjectableName(inject, providedIn, useNonSingleton = true) {
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
        injectabledName = $dict.nonSingletonFn(injectabledName);
    return injectabledName;
}
function getInjectabledType(inject, providedIn) {
    return { inject: getInjectableName(inject, providedIn, false), providedIn };
}
function transformInjectables(injectArr, providedIn = 'global') {
    return injectArr.map(inject => {
        return getInjectabledType(inject, providedIn);
    });
}
function transformInjectableString(injectArr, providedIn = 'global') {
    return injectArr.map(inject => {
        return getInjectableName(inject, providedIn);
    });
}
export function replace(what, name, type) {
    if (type === 'name') {
        const reg = new RegExp(`(?=(?!^[${what}$])(?=.*${what}$))`, 'i');
        if (reg.test(name))
            name = name.replace(new RegExp(what, 'i'), '');
        name = name.replace(/^\w/, str => str.toLowerCase());
    }
    return camelCase(name);
}
export const $dict = {
    nonSingleton: '$stDecoratedNonSingleton',
    nonSingletonFn: (name) => $dict.nonSingleton + name
};

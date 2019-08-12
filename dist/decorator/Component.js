import { Util } from '../shared/util';
const type = 'component';
export function Component(config = {}) {
    return function (target) {
        Util.$inject(target, config.inject, config.providers);
        let component = {
            controller: Util.injectAll(target),
            bindings: config.bindings,
            template: config.template,
            controllerAs: config.controllerAs,
            require: config.require,
            transclude: config.transclude,
            templateUrl: config.templateUrl
        };
        target.$stComponent = component;
        target.$stComponentName = Util.replace(type, config.selector, 'selector') || Util.replace(type, target.name, 'name');
        return target.$stComponent.controller;
    };
}

import { Util } from "../shared/util";
const type = 'directive';
export function Directive(config = {}) {
    return function (target) {
        target.$stDirectiveName = Util.replace(type, config.selector, 'selector') || Util.replace(type, target.name, 'name');
        Util.$inject(target, config.inject, config.providers);
        return Util.injectAll(target);
    };
}

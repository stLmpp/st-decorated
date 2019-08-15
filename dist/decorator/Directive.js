import { Util } from "../shared/util";
const type = 'directive';
export function Directive(config = {}) {
    return function (target) {
        target.$stDirectiveName = Util.replace(type, config.selector, 'selector') || Util.replace(type, target.name, 'name');
        Util.$inject(target, config.inject);
        if (!target.prototype.compile) {
            target.prototype.compile = () => { };
        }
        const originalCompile = target.prototype.compile;
        const linkFunction = target.prototype.link;
        transformCompile(target.prototype, function () {
            return function () {
                originalCompile.apply(this, arguments);
                if (linkFunction) {
                    return linkFunction.bind(this);
                }
            };
        });
        target.$stType = type;
        return Util.injectAll(target);
    };
}
function transformCompile(prototype, callback) {
    prototype.compile = callback(prototype.compile);
}

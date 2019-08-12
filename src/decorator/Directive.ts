import { Util } from "../shared/util";

const type = 'directive';

export function Directive(config: DirectiveConfig = {}){
  return function(target: any){
    target.$stDirectiveName = Util.replace(type, config.selector, 'selector') || Util.replace(type, target.name, 'name');
    Util.$inject(target, config.inject);
    if (!target.prototype.compile){
      target.prototype.compile = () => {};
    }
    const originalCompile = target.prototype.compile;
    const linkFunction = target.prototype.link;
    transformCompile(target.prototype, function(){
      return function(){
        originalCompile.apply(this, arguments);
        if (linkFunction){
          return linkFunction.bind(this);
        }
      }
    });
    return Util.injectAll(target);
  }
}

function transformCompile(prototype: any, callback: Function){
  prototype.compile = callback(prototype.compile);
}

export interface DirectiveConfig {
  selector?: string;
  inject?: string[];
}


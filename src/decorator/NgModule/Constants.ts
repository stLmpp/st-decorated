import { IModule } from 'angular';
import { IConstant } from './NgModule';

export function declareConstants(
  mod: IModule,
  constants: IConstant[],
  type: string = 'constant'
): void {
  if (!constants) return;
  for (let i = 0, len = constants.length; i < len; i++) {
    mod[type](constants[i].name, constants[i].value);
  }
}

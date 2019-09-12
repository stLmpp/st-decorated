import { IModule } from "angular";

export function declareBase(mod: IModule, declarations: any[], type: string){
  if (!declarations) return;
  for(let i = 0, len = declarations.length; i < len; i++) mod[type](declarations[i]);
}
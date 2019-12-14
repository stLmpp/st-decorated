import { IModule } from 'angular';

export function declareDeclarations(mod: IModule, declarations: any[]): void {
  const id = declarations?.length ?? 0;
  for (let i = 0; i < id; i++) {
    const component = declarations[i];
    const type = component.$stType;
    if (type === 'directive') {
      const directive = (...args: any) => new component(...args);
      const directiveArr = [...component.$inject, directive];
      mod.directive(component.$stDirectiveName, directiveArr);
    } else mod.component(component.$stComponentName, component.$stComponent);
  }
}

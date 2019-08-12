## st-decorated
Set of Decorators to create AngularJS apps with the Decorators of Angular 2 (kinda)
## Contents

 - [Installation](#installation)
 - [Usage](#Usage)

## Installation

```node
npm install angular-st-decorated --save-dev
```
## Usage
This package works similarly to [ng-decorated](https://www.npmjs.com/package/ng-decorated) (Big shout to the guy who created it)
Import the Decorator you want and add to the class (Component, Service, Filter, etc) and it will add metadata to the Class to use it later in the [`@NgModule`](#@NgModule) Decorator
## Decorators

### `@Config` (beta)
```javascript
import { Config } from 'angular-st-decorated';

@Config('MyProvider', '$http')
class MyConfig {
  $execute(){
    // This method is mandatory, this will execute your config
    this.$httpProvider.interceptors.push('myInterceptorFactory');
  }
}
```
#### Config options
There is only one option which is the list of injections in this config
You can either use the full name of the provider, or just the initial name (like `$http` or `$httpProvider`, both will work)
The `$execute` method is mandatory, and you can also implement the interface `IConfig` if using Typescript

### `@Decorator` (beta)
```javascript
import { Decorator } from 'angular-st-decorated';

@Decorator({
  decorate: 'MyService',
  inject: [
    'MyConstant'
  ]
})
class MyServiceDecorator {
  $decorate($delegate){
    // Do something with your service here, and then return the $delegate parameter
    return $delegate;
  }
}
```
#### Decorator options
`decorate` { string } Name of what you're decorating (Service, Directive, Factory, Filter, etc)
`inject?` { string[] } List of injections (remember that this runs at Config phase)

> The `$decorate` method is mandatory, and you HAVE to return the parameter or your decorated service will not work

### `@Service` (stable)
```javascript
import { Service } from 'angular-st-decorated';

@Service({
  inject: [
    '$http'
  ]
})
class MyService {
  getApi(){
    return this.$http.get('http://something.com').then(response => {
      return response.data;
    })
  }
}
```
#### Service options
`name?` { string } Name of your service (will be used in the injections of Componenets, others services, etc)
**Default:** Name of your class
`inject?` { string[] } Names of the injections of the this component (Services, Factories, Constants, etc)
`providers?`  { string[] } Same as inject, except that it is a non singleton (Works only if the Service/Factory is "nonSingleton" [See @Service options](#`@Service`))
`nonSingleton?` { boolean } Used to define the Service as a Non Singleton service (it can also be used as a singleton, it will depend where you inject it [See @Component options "inject" and "providers"](#`@Component`))
**Default:** false

### `@Factory` (beta)
```javascript
import { Factory } from 'angular-st-decorated';

@Factory({
  inject: [
    'MyService'
  ]
})
class MyFactory {
  myMethod(){
    return this.MyService.getApi();
  }
}
```
#### Factory options
`name?` { string } Name of your factory (will be used in the injections)
**Default:** Name of your class
`inject?` { string[] } Names of the injections of the this factory (Services, other factories, Constants, etc)

> I don't see any reason to use a Factory (other than HttpInterceptor or any other module that uses Factories), to be honest, Services has it all, and it's better because you can use non singletons and also inject non singletons, here you can't (yet)

### `@Component` (beta)

```javascript
import { Component } from 'angular-st-decorated';

@Component({
  selector: 'my-component',
  template: '<p>MyComponent works</p>',
  inject: [
    'MyService'
  ],
  providers: [
    'MyNonSingletonService'
  ]
})
class MyComponent {
  $onInit(){
    /* do something with your service/factory here using 'this.MyService'
       or using your nonSingletonService (this.MyNonSingletonService), the instance of your nonSingletonService will be unique for every component/service you provide it
    */
  }
}
```
#### Component options
`selector?` { string } This is the selector of your component, used in the template, you can use Camel case or hyphen separated names (or mix them) **Default**: Name of your class (e.g. MyComponent will be "my-component")
`inject?` { string[] } Array of string with the name of the injections of the this component (Services, Factories, Constants, etc)
`providers?` { string[] } Same as inject, except that it's a non-singleton (Works only if the Service/Factory is "nonSingleton" [See @Service](#`@Service`))
> More options: [Angular component docs](https://docs.angularjs.org/guide/component)

### `@Directive` (alpha)
```javascript
import { Directive } from 'angular-st-decorated';

@Directive({
  selector: 'my-directive',
  inject: [
    'MyService'
  ]
})
class MyDirective {
  scope = {
    'myDirective': '@'
  };
  retrict = 'EA';
  link($scope, $element){
    // Do something here
  }
  compile(tElement){
    // Do something here
  }
}
```
#### Directive options
`selector?` { string } This is the selector of your component, used in the template, you can use Camel case or hyphen separated names (or mix them) 
**Default**: Name of your class (e.g. MyComponent will be "my-component")
`inject?` { string[] } Array of string with the name of the injections of the this directive (Services, Factories, Constants, etc)

### `@Filter` (beta)
```javascript
import { Filter } from 'angular-st-decorated';

@Filter({
  name: 'myFilter',
  inject: [
    'MyService'
  ]
})
class MyFilter {
  $transform(value, option){
    return this.MyService.myMethod(value, option);
  }
}
```

### `@Run`
```javascript
import { Run } from 'angular-st-decorated';

@Run('$http', 'MyService')
class RunPh {
  $execute(){
    this.$http.get('http://myapi.com').then(response => {
      this.MyService.myApiResp = response;
    })
  }
}
```

### `@NgModule` (beta)
```javascript
import { NgModule } from 'angular-st-decorated';
import { MyComponent } from './app/myComponent';
import { MyDirective } from './app/myDirective';
import { MyFactory } from './app/myFactory';
import { MyService } from './app/myService';
import { MyOtherModule } from './app/myOtherModule/myOtherModule';

@NgModule({
  imposts: [
    MyOtherModule
  ],
  declarations: [
    MyComponent,
    MyDirective
  ],
  providers: [
    MyFactory,
    MyService
  ]
})
class MyModule {
}
```
#### NgModule options
`module?` { string } Name of your module
**Default:** Name of your class
`imports?` { Array<string | T> } Names of your others modules (string) or the class itself
`configs?` { T[] } Array of configs
`routing?` { T } Your routing config **(alpha)**
`providers?` { T[] } Array of Services and Factories
`declarations?` { T[] } Array of Components and Directives
`decorators?` { T[] } Array of Decorators (config)
`values?` { IConstant[] } Array of Values (angular.module().value)
`constants?` { IConstant[] } Array of Constants (angular.module().constant)
`filters?` { T[] } Array of Filters
`run?` { T[] } Array of Run
`bootstrap?` { element: HTMLElement, strictDi: boolean } The same as angular.boostrap, only one per application is allowed

### `@Inject` (stable)
```javascript
import { Inject } from 'angular-st-decorated';

@Inject('$http', 'MyService')
class Controller {
  constructor($http, MyService){
    this.$http = $http;
    this.MyService = MyService;
  }
}
```
> No reason to use this tho

I'm very new to this world of publishing my things, so, if anyone has any tips to what to do, please, contact me.
gui.stlmpp@hotmail.com / gui.stlmpp@gmail.com

I'll update this with more info later also
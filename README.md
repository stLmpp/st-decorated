# st-decorated

Set of Decorators to create AngularJS apps with the Decorators of Angular 2 (kinda)

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [Decorators](#decorators)
  - [`@Config`](#config)
  - [`@Decorator`](#decorator)
  - [`@Service`](#service)
  - [`@Factory`](#factory)
  - [`@Component`](#component)
  - [`@Directive`](#directive)
  - [`@Filter`](#filter)
  - [`@Run`](#run)
  - [`@NgModule`](#ngModule)
  - [`@Inject`](#inject)

## Installation

```node
npm install angular-st-decorated --save-dev
```

## Usage

This package works similarly to [ng-decorated](https://www.npmjs.com/package/ng-decorated) (Big shout to the guy who created it)\
Import the Decorator you want and add to the class (Component, Service, Filter, etc) and it will add metadata to the Class to use it later in the [`@NgModule`](#NgModule) Decorator

> The `$execute` method is mandatory

## Decorators

### `@Config`

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

### `@Decorator`

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

| Name | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| decorate | string | Name of what you're decorating (Service, Directive, Factory, Filter, etc) | undefined | Yes |
| inject | any[] | List of injections (string or class) | undefined | No |

> The `$decorate` method is mandatory, and you HAVE to return the parameter or your decorated service will not work

### `@Service`

```javascript
import { Service } from 'angular-st-decorated';
import { MyOtherSerivce } from './services';

@Service({
  inject: [
    '$http', MyOtherService
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

| Name | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| name | string | Name of your service (will be used as a injectable) | Name of your class | No |
| inject | any[] | List of injections (string or class) | undefined | No |
| providers | any[] | List of injections (Only work with services), but it provides a new instance, that is, it will not use the global instance of your service | undefined | No |
| global | boolean | Inject the Service globally (in the bootstraped Module, to be precise) and only if you import it in one of your injections | false | No |

### `@Factory`

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

| Name | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| name | string | Name of your factory (will be used as a injectable) | Name of your class | No |
| inject | any[] | List of injections (string or class) | undefined | No |

> I don't see any reason to use a Factory (other than HttpInterceptor or any other module that uses Factories), to be honest, Services has it all, and it's better because you can use non singletons and also inject non singletons, here you can't (yet)

### `@Provider`

```javascript
import { Provider } from 'angular-st-decorated';

@Provider({
  inject: [
    'MyConstant'
  ]
})
class MyFactory {
  @Inject('$http')
  $get($http){
    return this;
  }
}
```

#### Provider options

| Name | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| name | string | Name of your provider (will be used as a injectable) | Name of your class | No |
| inject | any[] | List of injections (string or class) | undefined | No |

### `@Component`

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

| Name | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| selector | string | This is the selector of your component, used in the template, you can use Camel case or hyphen separated names (or mix them) | Name of your class | No |
| inject | any[] | List of injections (string or class) | undefined | No |
| providers | any[] | List of injections (Only work with services), but it provides a new instance, that is, it will not use the global instance of your service | undefined | No |
> More options: [Angular component docs](https://docs.angularjs.org/guide/component)

### `@Directive`

```javascript
import { Directive } from 'angular-st-decorated';

@Directive({
  selector: 'my-directive',
  inject: [
    'MyService'
  ],
  scope = {
    'myDirective': '@'
  },
  restrict: 'EA'
})
class MyDirective {
  link($scope, $element){
    // Do something here
  }
  compile(tElement){
    // Do something here
  }
}
```

#### Directive options

| Name | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| selector | string | This is the selector of your directive, used in the template, you can use Camel case or hyphen separated names (or mix them) | Name of your class | No |
| inject | any[] | List of injections (string or class) | undefined | No |

### `@Filter`

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

#### Filter options

| Name | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| name | string | Name of your filter | Name of your class | No |
| inject | any[] | List of injections (string or class) | undefined | No |

### `@Run`

Like the config, there only one options for Run, and it's the list of injections

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

#### Run options

There is only one option which is the list of injections

> The `$execute` method is mandatory

### `@NgModule`

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

| Name | Type | Description | Default | Required |
| ---- | ---- | ----------- | ------- | -------- |
| module | string | Name of your module | Name of your class | No |
| import | any[]  | An array with the others modules you want to import, this can be a name (string) or the class of the module | undefined | No |
| configs | any[] | An array with the Config classes | undefined | No |
| decorators | any[] | An array with the Decorators classes | undefined | No |
| routing | any | A class with the routing config class | undefined | No |
| providers | any[] | An array with the Services, Providers, Factories and Filters (classes) | undefined | No |
| declarations | any[] | An array with the Components and Directives classes | undefined | No |
| values | IConstant[] | An array of Values (module.value) | undefined | No |
| constants | IConstant[] | An Array of Constants (module.constant) | undefined | No |
| run | any[] | An Array of Run's (module.run) classes | undefined | No |
| bootstrap | { element: HTMLElement, strictDi: boolean } | It's the same as angular.bootstrap. Only one module can have bootstrap | undefined | No |

### `@Inject`

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

### Notes

> If you plan to minify your files, you will need to use the "name" and "selector" properties, because if you let the default (Name of the class) for Services or for Components, and your class get the named changed in the minify process, it will break the app, so, it's a good thing to ALWAYS use the name/selector option


I'm very new to this world of publishing my things, so, if anyone has any tips on what to do, please, contact me.\
gui.stlmpp@hotmail.com / gui.stlmpp@gmail.com\
\
I'll update this with more info later also

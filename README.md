# Typed Stimulus controllers<br>[![npm version](https://badge.fury.io/js/@sigbit%2Fstimulus-ts.svg)](https://www.npmjs.com/package/@sigbit/stimulus-ts)
> 🤝 &nbsp;Create type-safe Stimulus controllers

```sh
$ npm install @hotwired/stimulus @sigbit/stimulus-ts
```

## Usage
```ts
import { TypedController } from '@sigbit/stimulus-ts'

class ControllerA extends TypedController({
  element: HTMLDivElement,
  targets: {
    form: HTMLFormElement,
  },
  values: {
    delay: Number,
  },
  outlets: {
    // Types are inferred from other controllers
    anotherController: ControllerB,
  },
}) {
  connect() {
    this.element
        // ^? (property) Controller<HTMLDivElement>.element: HTMLDivElement


    this.formTarget
        // ^? (property) formTarget: HTMLFormElement
    this.hasFormTarget
        // ^? (property) hasFormTarget: boolean
    this.formTargets
        // ^? (property) formTargets: HTMLFormElement[]


    this.delayValue
        // ^? (property) delayValue: number
    this.hasDelayValue
        // ^? (property) hasDelayValue: boolean


    this.anotherControllerOutlet
        // ^? (property) anotherControllerOutlet: ControllerB
    this.anotherControllerOutletElement
        // ^? (property) anotherControllerOutletElement: HTMLFormElement
    this.anotherControllerOutletElements
        // ^? (property) anotherControllerOutletElements: HTMLFormElement[]
    this.hasAnotherControllerOutlet
        // ^? (property) hasAnotherControllerOutlet: boolean


    ControllerB
        // ^? class ControllerB extends TypedController<HTMLFormElement>() {}
  }
}
```

### Without this package
```ts
import { Controller } from '@hotwired/stimulus'

class ControllerA extends Controller<HTMLDivElement> {
  static targets = ['form']
  static outlets = ['another-controller']
  static values = {
    delay: Number
  }

  readonly formTarget!: HTMLFormElement
  readonly formTargets!: HTMLFormElement[]
  readonly hasFormTarget!: boolean

  delayValue!: number
  readonly hasDelayValue!: boolean

  readonly anotherControllerOutlet!: ControllerB
  readonly anotherControllerOutletElement!: HTMLFormElement
  readonly anotherControllerOutletElements!: HTMLFormElement[]
  readonly hasAnotherControllerOutlet!: boolean

  connect () {
    // ...
  }
}
```

## License
[MIT](./LICENSE)

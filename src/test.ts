import { TypedController } from '.'

class ControllerB extends TypedController<HTMLFormElement>() {}

class ControllerA extends TypedController({
  element: HTMLDivElement,
  targets: {
    form: HTMLFormElement,
  },
  values: {
    delay: Number,
  },
  outlets: {
    anotherController: ControllerB
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
  }
}
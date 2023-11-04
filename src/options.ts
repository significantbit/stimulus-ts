import type { Controller } from '@hotwired/stimulus'

export type TargetOption = Record<string, Constructor<HTMLElement>>
export type ValueOption = typeof Controller.values
export type OutletOption = Record<string, Constructor<Controller>>

/**
 * Typed controller options
 * @see https://github.com/significantbit/stimulus-ts/blob/main/src/options.ts
 */
export interface Options <
  TElement extends HTMLElement,
  TTargets extends TargetOption,
  TValues extends ValueOption,
  TOutlets extends OutletOption,
> {
  /**
   * this.element type
   * @see https://stimulus.hotwired.dev/handbook/hello-stimulus#is-this-thing-on%3F
   */
  element?: Constructor<TElement>

  /**
   * Controller targets
   * @see https://stimulus.hotwired.dev/reference/targets
   * @example
   * targets: {
   *   foo: HTMLDivElement
   * }
   */
  targets?: TTargets

  /**
   * Controller values
   * @see https://stimulus.hotwired.dev/reference/values
   * @example
   * values: {
   *   foo: String
   * }
   */
  values?: TValues

  /**
   * Controller outlets
   * @see https://stimulus.hotwired.dev/reference/outlets
   * @example
   * outlets: {
   *   foo: FooController
   * }
   */
  outlets?: TOutlets
}

export type Constructor<T> = new (...args: any[]) => T
export type InferInstanceFromConstructor<T> = T extends Constructor<infer U> ? U : never
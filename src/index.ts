import { Controller } from '@hotwired/stimulus'
import type { Constructor, InferInstanceFromConstructor, Options, OutletOption, TargetOption, ValueOption } from './options'

// Re-export all Stimulus exports
export * from '@hotwired/stimulus'

/**
 * Create typed Stimulus controller
 * @param options Controller options
 * @param options.element this.element type
 * @param options.targets Controller targets
 * @param options.values Controller values
 * @param options.outlets Controller outlets
 * @see https://github.com/significantbit/stimulus-ts
 */
export function TypedController<
  TElement extends HTMLElement,
  TTargets extends TargetOption,
  TValues extends ValueOption,
  TOutlets extends OutletOption,
> (options?: Options<TElement, TTargets, TValues, TOutlets>):
  Constructor<Controller<TElement> & Targets<TTargets> & Values<TValues> & Outlets<TOutlets>>;

// Allow simple use, e.g. class MyController extends TypedController<HTMLDivElement>() {}
export function TypedController<
  TElement extends HTMLElement
> (options?: Options<TElement, {}, {}, {}>):
  Constructor<Controller<TElement>>;

export function TypedController <
  TElement extends HTMLElement,
  TTargets extends TargetOption,
  TValues extends ValueOption,
  TOutlets extends OutletOption,
> (options?: Options<TElement, TTargets, TValues, TOutlets>) {
  // Create controller class
  class TypedController extends Controller<TElement> {}

  // Add static properties
  if (options?.targets)
    TypedController.targets = Object.keys(options.targets)

  if (options?.values)
    TypedController.values = options.values

  if (options?.outlets)
    // Convert outlets to kebab-case
    TypedController.outlets = Object.keys(options.outlets).map(key => key.replace(/(\w)([A-Z])$/g, "$1-\L$2"))

  return TypedController as unknown
}

// Target-related instance properties
type Targets<T extends TargetOption> =
  { readonly [K in keyof T as `has${Capitalize<String<K>>}Target`]: boolean } &
  { readonly [K in keyof T as `${String<K>}Target`]: InstanceType<T[K]> } &
  { readonly [K in keyof T as `${String<K>}Targets`]: InstanceType<T[K]>[] }

// Value-related instance properties
type Values<T extends ValueOption> =
  { readonly [K in keyof T as `has${Capitalize<String<K>>}Value`]: boolean } &
  { [K in keyof T as `${String<K>}Value`]: InferControllerValue<T[K]> }

// Outlet-related instance properties
type Outlets<T extends OutletOption> =
  { readonly [K in keyof T as `has${Capitalize<String<K>>}Outlet`]: boolean } &
  { readonly [K in keyof T as `${String<K>}Outlet`]: InferControllerFromOutlet<T[K]> } &
  { readonly [K in keyof T as `${String<K>}Outlets`]: InferControllerFromOutlet<T[K]> } &
  { readonly [K in keyof T as `${String<K>}OutletElement`]: InferElementFromOutlet<T[K]> } &
  { readonly [K in keyof T as `${String<K>}OutletElements`]: InferElementFromOutlet<T[K]>[] }

type String<T> = T extends string ? T : never
type InferElementFromController<T> = T extends Constructor<Controller<infer U>> ? U : HTMLElement
type InferElementFromOutlet<T> = InferElementFromController<T>
type InferControllerFromOutlet<T> = InferInstanceFromConstructor<T>
type InferControllerValue<T> = T extends { type: infer U } ? InferControllerValue<U> : T extends () => infer U ? U : never
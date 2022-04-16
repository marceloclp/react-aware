import { ComponentProps, ElementType } from 'react'
import { Overwrite } from 'utility-types'

/**
 * Returns the default props of any React component or HTML element.
 *
 * @example
 *  PropsOf<'div'> // returns the default props of a DIV element
 *  PropsOf<MyComponent> // returns the props interface of MyComponent
 */
export type PropsOf<TagName extends ElementType = any> =
  TagName extends ElementType ? ComponentProps<TagName> : never

export type PropsAs<TagName extends ElementType, Props extends {}> =
  Overwrite<PropsOf<TagName>, Props> & { as?: TagName }

export type RenderFn<P> = (props: P) => JSX.Element

export type ElementRect = {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

export type SetRef<E extends Element> = (element: E) => void

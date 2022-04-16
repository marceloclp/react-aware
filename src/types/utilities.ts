import { ComponentProps, ElementType } from 'react'

/**
 * Returns the default props of any React component or HTML element.
 *
 * @example
 *  PropsOf<'div'> // returns the default props of a DIV element
 *  PropsOf<MyComponent> // returns the props interface of MyComponent
 */
export type PropsOf<TagName extends ElementType = any> =
  TagName extends ElementType ? ComponentProps<TagName> : never

// prettier-ignore
export type PropsAs<TagName extends ElementType, Props extends {}> =
  & Omit<PropsOf<TagName>, keyof Props>
  & Props & { as?: TagName }

export type EqualityFn<T> = (prev: T, next: T) => boolean

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

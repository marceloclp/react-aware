import '../../__mocks__/mock-resize-observer'
import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { RectAware } from './rect-aware'

describe('RectAware', () => {
  it('should be defined', () => {
    expect(RectAware).toBeDefined()
  })
  it('should have the correct display name', () => {
    expect(RectAware.displayName).toBe('RectAware')
  })

  describe('when rendering as a valid react element', () => {
    let result: RenderResult
    beforeEach(() => {
      result = render(
        <RectAware as="div" data-testid="wrapper">
          {({ height }) => <span>Height: {height}</span>}
        </RectAware>
      )
    })
    it('should use the value of `as` as the tag name', () => {
      expect(result.getByTestId('wrapper').tagName).toBe('DIV')
    })
    it('should have the height as its text content', () => {
      expect(result.getByTestId('wrapper').textContent).toBe('Height: 0')
    })
  })

  describe('when rendering as a react fragment', () => {
    let result: RenderResult
    beforeEach(() => {
      result = render(
        <RectAware as={React.Fragment} data-testid="wrapper">
          {({ height }, setRef) => (
            <span ref={setRef}>Height: {height}</span>
          )}
        </RectAware>
      )
    })
    it('should return a valid react element', () => {
      expect(result.getByTestId('wrapper').tagName).toBe('SPAN')
    })
    it('should have the height as its text content', () => {
      expect(result.getByTestId('wrapper').textContent).toBe('Height: 0')
    })
  })
})

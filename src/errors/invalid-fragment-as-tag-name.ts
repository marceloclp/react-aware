export default class InvalidFragmentAsTagName extends Error {
  constructor(name: string, props: Object) {
    super([
      'Passing props on <Fragment>!',
      `The current component <${name} /> is rendering as a Fragment, however `,
      'we need to passthrough the following props:',
      Object.keys(props).map(propName => `  - ${propName}`).join('\n'),
      '',
      'You can apply one of the following solutions:',
      [
        'Add an `as="..." prop, to ensure that we render an actual element instead of a Fragment',
        'Render a single element as the child so that we can forward the props onto that element.'
      ].map((line, index) => `  ${index + 1}. ${line}`).join('\n')
    ].join('\n'))
    this.name = 'InvalidFragmentAsTagName'
  }
}

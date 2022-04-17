export type Breakpoint = {
  name: string
  min: number
  max?: number
}

export type IScreen = {
  width: number
  height: number
  breakpoint: Breakpoint
}

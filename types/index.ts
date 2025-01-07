import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}
export type Nullable<T> = {
  [KeyWord in keyof T]?: T[KeyWord] | undefined
}
export interface ICrEditor extends PlainObject {
  schema?: PlainObject
  editable?: boolean
  value?: any
  errorMessage?: any
  setValue?: (val: any) => void
}

export interface ISchema extends PlainObject {
  type?: string
  label?: string
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  minItems?: number
  maxItems?: number
  placeholder?: string
  initValue?: string
}

interface PlainObject {
  [key: string]: any
}

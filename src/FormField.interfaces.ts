import { HTMLAttributes, ReactElement } from "react"
import { ControllerRenderProps, FieldError, FieldValues, Path, UseControllerProps } from "react-hook-form"

type ExtraElement<ControllerProps extends FieldValues> = (
  values: ControllerRenderProps<ControllerProps, FormFieldProps<ControllerProps>["name"]>
) => ReactElement

export type FormFieldChildren<ControllerProps extends FieldValues> = {
  error?: FieldError
  checked?: ControllerRenderProps["value"]
} & ControllerRenderProps<ControllerProps, Path<ControllerProps>>

export type FormFieldChildrenFn<ControllerProps extends FieldValues> = (
  props: FormFieldChildren<ControllerProps>
) => JSX.Element

export interface FormFieldProps<ControllerProps extends FieldValues = FieldValues>
  extends UseControllerProps<ControllerProps>,
    Omit<HTMLAttributes<HTMLDivElement | HTMLLabelElement>, "defaultValue" | "children" | "onChange"> {
  ExtraElement?: ExtraElement<ControllerProps>
  label?: string | JSX.Element
  infoText?: string | JSX.Element
  hideError?: boolean
  noLabelTag?: boolean
  keepErrorSpace?: boolean
  transformChange?: (value: ControllerRenderProps["value"], ...rest: any) => ControllerRenderProps["value"]
  transformValue?: (value: ControllerRenderProps["value"]) => ControllerRenderProps["value"]
  onChange?: (value: ControllerRenderProps["value"], ...rest: any) => void
  children: JSX.Element | FormFieldChildrenFn<ControllerProps>
  valueAsNumber?: boolean
  className?: string
}

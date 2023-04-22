import React, { ChangeEvent } from "react"
import { Controller, FieldValues } from "react-hook-form"
import { FormFieldProps } from "./FormField.interfaces"

import "./FormField.module.scss"

export const FormField = <T extends FieldValues = FieldValues>(props: FormFieldProps<T>): JSX.Element => {
  const {
    ExtraElement,
    className,
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    label,
    children,
    infoText,
    transformChange,
    transformValue,
    onChange,
    valueAsNumber,
    hideError,
    noLabelTag,
    keepErrorSpace,
    ...rest
  } = props

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState: { error } }) => {
        const change = (event: ChangeEvent<HTMLInputElement & HTMLSelectElement>, ...rest: any[]) => {
          const prev = field.value
          let val: any = event
          if (event.target) {
            const { type, checked, value, files } = event.target
            val = type === "checkbox" ? checked : type === "file" ? files : value
          }
          onChange?.(val, prev, ...rest)
          return field.onChange(transformChange ? transformChange(val, prev, ...rest) : val, ...rest)
        }

        const newLocal = (
          <>
            {label && <div className="label">{label}</div>}
            {typeof children === "function"
              ? children({
                  ...field,
                  error,
                  checked: transformValue ? transformValue(field.value) : field.value,
                  value: transformValue ? transformValue(field.value) : field.value,
                  onChange: change,
                })
              : {
                  ...children,
                  props: {
                    ...field,
                    error,
                    checked: transformValue ? transformValue(field.value) : field.value,
                    value: transformValue ? transformValue(field.value) : field.value,
                    onChange: change,
                    ...children.props,
                  },
                }}
            <div className="info">
              {!hideError && (
                <div
                  hidden={!keepErrorSpace || !error?.message}
                  className={`error ${keepErrorSpace ? "h-1rem" : "h-0"}`}
                >
                  {error?.message}
                </div>
              )}
              {infoText && <div className="info-text">{infoText}</div>}
            </div>
            {ExtraElement?.(field)}
          </>
        )

        if (noLabelTag)
          return (
            <div className={`FormField ${className}`} {...rest}>
              {newLocal}
            </div>
          )

        return (
          <label className={`FormField ${className}`} {...rest}>
            {newLocal}
          </label>
        )
      }}
    />
  )
}

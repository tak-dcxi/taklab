import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { BaseTextArea, BaseTextAreaPropsType } from '~/components/BaseTextArea'

export type FormTextAreaPropsType<T extends FieldValues> = BaseTextAreaPropsType & UseControllerProps<T>

export const FormTextArea = <T extends FieldValues>(props: FormTextAreaPropsType<T>) => {
  const { id, name, control, title, placeholder, required, disabled, error } = props
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController<T>({ name, control })

  return (
    <BaseTextArea
      ref={ref}
      id={id}
      title={title}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      error={error}
      {...rest}
    />
  )
}

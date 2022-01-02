import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { BaseTextField, BaseTextFieldPropsType } from '~/components/BaseTextField'

export type FormTextFieldPropsType<T extends FieldValues> = BaseTextFieldPropsType & UseControllerProps<T>

export const FormTextField = <T extends FieldValues>(props: FormTextFieldPropsType<T>) => {
  const { type, id, name, control, title, placeholder, autoComplete, required, disabled, error } = props
  const {
    field: { ref, ...rest },
    formState: { errors },
  } = useController<T>({ name, control })

  return (
    <BaseTextField
      ref={ref}
      id={id}
      type={type}
      title={title}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required={required}
      disabled={disabled}
      error={error}
      {...rest}
    />
  )
}

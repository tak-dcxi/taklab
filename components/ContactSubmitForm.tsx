import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { v4 as uuid } from 'uuid'
import { BaseButton } from '~/components/BaseButton'
import { FormTextArea } from '~/components/FormTextArea'
import { FormTextField } from '~/components/FormTextField'
import { BaseAlert } from './BaseAlert'
import { clamp } from '~/styles/tools/clamp'
import { ContactFormSteps } from './ContactFormSteps'
import { BaseIcon } from './BaseIcon'
import { BaseStack } from './BaseStack'
import { BaseCenter } from './BaseCenter'

// 入力のバリデーションルールのスキーマ
const schema = yup.object({
  firstName: yup.string().required('姓の入力は必須です'),
  givenName: yup.string().required('名の入力は必須です'),
  email: yup.string().required('メールアドレスの入力は必須です').email('正しいメールアドレスを入力してください'),
  subject: yup.string().required('件名の入力は必須です'),
  message: yup.string().required('メッセージの入力は必須です'),
})

type FormInputType = {
  firstName: string
  givenName: string
  organization: string
  email: string
  subject: string
  message: string
}

export const ContactSubmitForm: React.VFC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputType>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => console.log(data)
  const randomID = 'test'

  // エラーメッセージを表示するヘルパーコンポーネント
  const ErrorMessage = ({ name }: { name: keyof FormInputType }) =>
    errors[name] ? <BaseAlert>{errors[name]?.message}</BaseAlert> : null

  return (
    <form onSubmit={handleSubmit(onSubmit)} tabIndex={-1} aria-labelledby={randomID}>
      <h2 id={randomID} className="VisuallyHidden">
        お問い合わせ内容をご記入ください
      </h2>
      <BaseStack gap="80px">
        <ContactFormSteps current={1} />
        <FormPartsContainer>
          <BaseStack gap="32px">
            <FormFieldset>
              <FormLegend>
                お名前<FormRequiredIcon>必須</FormRequiredIcon>
              </FormLegend>
              <FormFieldsetContent>
                <FieldWithLabel
                  control={control}
                  name="firstName"
                  type="text"
                  autoComplete="first-name"
                  placeholder="姓"
                />
                <FieldWithLabel
                  control={control}
                  name="givenName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="名"
                />
              </FormFieldsetContent>
              <ErrorMessage name="firstName" />
              <ErrorMessage name="givenName" />
            </FormFieldset>

            <FieldWithLabel
              control={control}
              name="organization"
              type="text"
              autoComplete="organization"
              label="会社名"
            />
            <FieldWithLabel
              control={control}
              name="email"
              type="email"
              autoComplete="email"
              label="ご連絡先メールアドレス"
              required
            />
            <ErrorMessage name="email" />

            <FieldWithLabel control={control} name="subject" type="text" label="件名" required />
            <ErrorMessage name="subject" />

            <FieldWithLabel control={control} name="message" as="textarea" label="メッセージ" required />
            <ErrorMessage name="message" />
          </BaseStack>
        </FormPartsContainer>

        <BaseCenter gutters="0" intrinsic>
          <BaseButton type="submit" icon={<BaseIcon type={'chevron-right'} size={'1rem'} />}>
            入力内容確認へ
          </BaseButton>
        </BaseCenter>
      </BaseStack>
    </form>
  )
}

const FieldWithLabel = ({ control, name, label, ...rest }: any) => (
  <FormItem>
    <FormLabel>
      {label && (
        <FormLabelText>
          {label}
          {rest.required && <FormRequiredIcon>必須</FormRequiredIcon>}
        </FormLabelText>
      )}
      {rest.as === 'textarea' ? (
        <FormTextArea control={control} name={name} {...rest} />
      ) : (
        <FormTextField control={control} name={name} {...rest} />
      )}
    </FormLabel>
  </FormItem>
)

const FormItem = styled.p`
  & > * + * {
    margin-top: 8px;
  }
`

const FormPartsContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${640 / 16}rem;
`

const FormFieldset = styled.fieldset`
  & > * + * {
    margin-top: 8px;
  }
`

const FormFieldsetContent = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
`

const FormLabel = styled.label`
  & > * + * {
    margin-top: 8px;
  }
`

const FormLabelText = styled.span`
  align-items: baseline;
  display: inline-flex;
`

const FormRequiredIcon = styled.strong`
  background-color: var(--color-accent-1);
  border-radius: 2px;
  color: var(--color-grayscale-7);
  font-size: var(--fontsize-1);
  font-weight: normal;
  letter-spacing: 0.08em;
  margin-left: 8px;
  padding: 4px 8px;
`

const FormLegend = FormLabelText.withComponent('legend')

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

type FormInputType = {
  firstName: string
  givenName: string
  organization: string
  email: string
  subject: string
  message: string
}

const schema = yup.object({
  firstName: yup.string().required('姓の入力は必須です'),
  givenName: yup.string().required('名の入力は必須です'),
  email: yup.string().required('メールアドレスの入力は必須です').email('正しいメールアドレスを入力してください'),
  subject: yup.string().required('件名の入力は必須です'),
  message: yup.string().required('メッセージの入力は必須です'),
})

export const ContactSubmitForm: React.VFC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputType>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => console.log(data)

  const randomID = uuid()

  return (
    <form onSubmit={handleSubmit(onSubmit)} tabIndex={-1} aria-labelledby={randomID}>
      <h2 id={randomID} className="VisuallyHidden">
        お問い合わせフォーム
      </h2>
      <BaseStack gap={clamp(64, 80)}>
        <ContactFormSteps current={1} />
        <FormPartsContainer>
          <BaseStack gap={'32px'}>
            <FormFieldset>
              <FormLegend>
                お名前<strong>必須</strong>
              </FormLegend>
              <FormFieldsetContent>
                <label>
                  <span className="VisuallyHidden">姓</span>
                  <FormTextField
                    control={control}
                    type={'text'}
                    name={'firstName'}
                    autoComplete={'first-name'}
                    placeholder={'姓'}
                    required
                    error={'firstName' in errors}
                  />
                </label>
                <label>
                  <span className="VisuallyHidden">名</span>
                  <FormTextField
                    control={control}
                    type={'text'}
                    name={'givenName'}
                    autoComplete={'given-name'}
                    placeholder={'名'}
                    required
                    error={'givenName' in errors}
                  />
                </label>
              </FormFieldsetContent>
              {errors.firstName && <BaseAlert>{errors.firstName?.message}</BaseAlert>}
              {errors.givenName && <BaseAlert>{errors.givenName?.message}</BaseAlert>}
            </FormFieldset>

            <FormItem>
              <FormLabel>
                <FormLabelText>会社名</FormLabelText>
                <FormTextField control={control} type={'text'} name={'organization'} autoComplete={'organization'} />
              </FormLabel>
            </FormItem>

            <FormItem>
              <FormLabel>
                <FormLabelText>
                  ご連絡先メールアドレス<strong>必須</strong>
                </FormLabelText>
                <FormTextField
                  control={control}
                  type={'email'}
                  name={'email'}
                  autoComplete={'email'}
                  required
                  error={'email' in errors}
                />
              </FormLabel>
              {errors.email && <BaseAlert>{errors.email?.message}</BaseAlert>}
            </FormItem>

            <FormItem>
              <FormLabel>
                <FormLabelText>
                  件名<strong>必須</strong>
                </FormLabelText>
                <FormTextField control={control} type={'text'} name={'subject'} required error={'subject' in errors} />
              </FormLabel>
              {errors.subject && <BaseAlert>{errors.subject?.message}</BaseAlert>}
            </FormItem>

            <FormItem>
              <FormLabel>
                <FormLabelText>
                  メッセージ<strong>必須</strong>
                </FormLabelText>
                <FormTextArea control={control} name={'message'} required error={'message' in errors} />
              </FormLabel>
              {errors.message && <BaseAlert>{errors.message?.message}</BaseAlert>}
            </FormItem>
          </BaseStack>
        </FormPartsContainer>

        <ButtonWrapper>
          <BaseButton type="submit" icon={<BaseIcon type={'chevron-right'} />}>
            入力内容確認へ
          </BaseButton>
        </ButtonWrapper>
      </BaseStack>
    </form>
  )
}

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
  font-weight: bold;

  & > strong {
    background-color: var(--color-accent-1);
    border-radius: 2px;
    color: var(--color-grayscale-7);
    font-size: var(--fontsize-1);
    font-weight: normal;
    letter-spacing: 0.08em;
    margin-left: 8px;
    padding: 4px 8px;
  }
`

const FormLegend = FormLabelText.withComponent('legend')

const ButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
`

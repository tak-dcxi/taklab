import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { BaseButton } from '~/components/BaseButton'
import { BaseLabelText } from '~/components/BaseLabelText'
import { FormTextArea } from '~/components/FormTextArea'
import { FormTextField } from '~/components/FormTextField'

type FormInputType = {
  name: string
  email: string
  message: string
}

const schema = yup.object({
  name: yup.string().required('お名前の入力は必須です'),
  email: yup.string().required('メールアドレスの入力は必須です').email('正しいメールアドレスを入力してください'),
  message: yup.string().required('メッセージの入力は必須です'),
})

export const HomeRequestForm: React.VFC = () => {
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

  return (
    <MyRoot onSubmit={handleSubmit(onSubmit)}>
      <MyStack1>
        <MyDescription>
          <p>お問い合わせお待ちしております。</p>
        </MyDescription>
        <MyStack2>
          <MyItem>
            <p>
              <label htmlFor="form_name">
                <BaseLabelText required>お名前</BaseLabelText>
              </label>
            </p>
            <p>
              <FormTextField
                control={control}
                id="form_name"
                type="text"
                name="name"
                required
                error={'name' in errors}
              />
            </p>
            {errors.name && <MyAlertText role="alert">{errors.name?.message}🙏</MyAlertText>}
          </MyItem>
          <MyItem>
            <p>
              <label htmlFor="form_email">
                <BaseLabelText required>メールアドレス</BaseLabelText>
              </label>
            </p>
            <p>
              <FormTextField
                control={control}
                id="form_email"
                type="email"
                name="email"
                required
                error={'email' in errors}
              />
            </p>
            {errors.email && <MyAlertText role="alert">{errors.email?.message}🙏</MyAlertText>}
          </MyItem>
          <MyItem>
            <p>
              <label htmlFor="form_message">
                <BaseLabelText required>メッセージ</BaseLabelText>
              </label>
            </p>
            <p>
              <FormTextArea control={control} id="form_message" name="message" required error={'message' in errors} />
            </p>
            {errors.message && <MyAlertText role="alert">{errors.message?.message}🙏</MyAlertText>}
          </MyItem>
        </MyStack2>
      </MyStack1>
      <MyButtonWrapper>
        <BaseButton type="submit">Submit</BaseButton>
      </MyButtonWrapper>
    </MyRoot>
  )
}

const MyRoot = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
`

const MyStack1 = styled.div`
  & > * + * {
    margin-top: 48px;
  }
`

const MyStack2 = styled.div`
  & > * + * {
    margin-top: 24px;
  }
`

const MyDescription = styled.div`
  line-height: var(--leading-loose);

  & > * + * {
    margin-top: 1em;
  }
`

const MyItem = styled.div`
  & > * + * {
    margin-top: 8px;
  }
`

const MyAlertText = styled.p`
  color: var(--invalid-color);
`

const MyButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`

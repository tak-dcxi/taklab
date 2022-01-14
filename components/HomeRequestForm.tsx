import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { BaseButton } from '~/components/BaseButton'
import { BaseLabelText } from '~/components/BaseLabelText'
import { FormTextArea } from '~/components/FormTextArea'
import { FormTextField } from '~/components/FormTextField'
import { BaseAlert } from './BaseAlert'
import { BaseContainer } from './BaseContainer'

type FormInputType = {
  name: string
  email: string
  subject: string
  message: string
}

const schema = yup.object({
  name: yup.string().required('お名前の入力は必須です'),
  email: yup.string().required('メールアドレスの入力は必須です').email('正しいメールアドレスを入力してください'),
  subject: yup.string().required('件名の入力は必須です'),
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
    <BaseContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack1>
          <Description>
            <p>
              お仕事のご依頼やご相談、イベントでの登壇依頼、当サイトおよび私に対するご要望・ご感想・クレームやメッセージはこちらのお問い合わせフォームよりお気軽にお問い合わせください。
            </p>
            <p>
              また、当サイトへの広告掲載依頼や記事投稿で紹介して欲しいサービスやコンテンツなどがありましたらご連絡ください。内容を厳選した上でご紹介させていただきます。
            </p>
            <p>お問い合わせの内容によっては返信を控えさせていただく場合がございます。あらかじめご了承ください。</p>
          </Description>
          <Stack2>
            <Item>
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
              {errors.name && <BaseAlert>{errors.name?.message}</BaseAlert>}
            </Item>
            <Item>
              <p>
                <label htmlFor="form_email">
                  <BaseLabelText required>ご連絡先メールアドレス</BaseLabelText>
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
              {errors.email && <BaseAlert>{errors.email?.message}</BaseAlert>}
            </Item>
            <Item>
              <p>
                <label htmlFor="form_email">
                  <BaseLabelText required>件名</BaseLabelText>
                </label>
              </p>
              <p>
                <FormTextField
                  control={control}
                  id="form_subject"
                  type="text"
                  name="subject"
                  required
                  error={'subject' in errors}
                />
              </p>
              {errors.subject && <BaseAlert>{errors.subject?.message}</BaseAlert>}
            </Item>
            <Item>
              <p>
                <label htmlFor="form_message">
                  <BaseLabelText required>メッセージ</BaseLabelText>
                </label>
              </p>
              <p>
                <FormTextArea control={control} id="form_message" name="message" required error={'message' in errors} />
              </p>
              {errors.message && <BaseAlert>{errors.message?.message}</BaseAlert>}
            </Item>
          </Stack2>
        </Stack1>
        <ButtonWrapper>
          <BaseButton type="submit">Submit</BaseButton>
        </ButtonWrapper>
      </Form>
    </BaseContainer>
  )
}

const Form = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
`

const Stack1 = styled.div`
  & > * + * {
    margin-top: 48px;
  }
`

const Stack2 = styled.div`
  & > * + * {
    margin-top: 32px;
  }
`

const Description = styled.div`
  line-height: var(--leading-loose);

  & > * + * {
    margin-top: 1.5em;
  }
`

const Item = styled.div`
  & > * + * {
    margin-top: 8px;
  }
`

const ButtonWrapper = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 48px;
`

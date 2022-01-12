import React from 'react'
import { NextPage } from 'next'
import { ErrorPageTemplate } from '~/components/ErrorPageTemplate'

const Error404Page: NextPage = () => {
  return <ErrorPageTemplate statusCode={404} />
}

export default Error404Page

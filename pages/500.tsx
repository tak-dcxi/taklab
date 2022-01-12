import React from 'react'
import { NextPage } from 'next'
import { ErrorPageTemplate } from '~/components/ErrorPageTemplate'

const Error500Page: NextPage = () => {
  return <ErrorPageTemplate statusCode={404} />
}

export default Error500Page

import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { ErrorPageTemplate } from '~/components/ErrorPageTemplate'

type ErrorPagePropsType = {
  statusCode: number
}

const ErrorPage: NextPage<ErrorPagePropsType> = ({ statusCode }) => {
  return <ErrorPageTemplate statusCode={statusCode} />
}

ErrorPage.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode: number = res ? res.statusCode : err ? err.statusCode ?? 500 : 404

  return { statusCode }
}

export default ErrorPage

import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router'

const Status = ({code, children}) =>
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code
      return children
    }}
  />

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const ActionDiv = styled.div`
  margin-top: 20px;
`

const NotFoundPage = () => (
  <Status code={404}>
    <NotFoundContainer>
      <h1>Oops!</h1>
      <div>Looks like you’re lost...</div>
      <ActionDiv>
        <a className={`btn btn-primary`} href={`/`}>
          Guide me to the right path!
        </a>
      </ActionDiv>
    </NotFoundContainer>
  </Status>
)

export default NotFoundPage

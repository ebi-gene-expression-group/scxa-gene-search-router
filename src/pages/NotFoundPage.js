import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router'

const Status = ({code, children}) =>
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }} />

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const NotFoundPage = () =>
  <Status code={404}>
    <NotFoundContainer>
      <h1>404</h1>
      <div className={`margin-top-xlarge`}>
        <a href={`/`}>Go back to home</a>
      </div>
    </NotFoundContainer>
  </Status>

export default NotFoundPage

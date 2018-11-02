import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route} from 'react-router-dom'

const SearchRouter = ({atlasUrl, basename}) => {
  <BrowserRouter basename={basename}>
    <Route
      path={`/search`}
      />
  </BrowserRouter>

SearchRouter.propTypes = {
  atlasUrl: PropTypes.string.isRequired,
  basename: PropTypes.string.isRequired
}

export default SearchRouter

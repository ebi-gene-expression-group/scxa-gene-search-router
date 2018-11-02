import React from 'react'
import ReactDOM from 'react-dom'
import SearchRouter from '../src/SearchRouter'

const render = (options, target) => {
  ReactDOM.render(<SearchRouter {...options} />, document.getElementById(target))
}

export { render }

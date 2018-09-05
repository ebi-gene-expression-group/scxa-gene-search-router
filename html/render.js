import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom';
import MyComponent from '../src/index.js'

const render = (options, target) => {
  ReactDOM.render(<Router><MyComponent {...options} /></Router>, document.getElementById(target))
}

export {render}

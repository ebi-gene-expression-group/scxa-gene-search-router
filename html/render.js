import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom';
import SearchApp from '../src/index.js'

const render = (options, target) => {
  ReactDOM.render(<Router><SearchApp {...options} /></Router>, document.getElementById(target))
}

export {render}

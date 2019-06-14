import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>home</Link></li>
        <li><Link to='/player'>player</Link></li>
        <li><Link to='/player/2'>playerDetail</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header

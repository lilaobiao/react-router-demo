import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import AllPlayer from './AllPlayer'
import Player from './Player'

// import FullRoster from './FullRoster'
// import Roster from './Roster'
// import Schedule from './Schedule'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/player' component={AllPlayer}/>
      <Route path='/player/:id' component={Player}/>

      {/* <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/> */}
    </Switch>
  </main>
)

export default Main

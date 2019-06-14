// import React from 'react'
// const Player = () => (
//   <div>
//     <h1>我是playerDetail页</h1>
//   </div>
// )
// export default Player

import React from 'react'
import PlayerAPI from '../api'
import { Link } from 'react-router-dom'

const Player = (props) => {
  const player = PlayerAPI.get(
    parseInt(props.match.params.id, 10)
  )
  if (!player) {
    return <div>对不起，没有找到对应的Player</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.id})</h1>
      <h2>Position: {player.position}</h2>
      <Link to='/player'>Back</Link>
    </div>
  )
}

export default Player



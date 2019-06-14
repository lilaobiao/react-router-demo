// import React from 'react'
// const AllPlayer = () => (
//   <div>
//     <h1>我是player页</h1>
//   </div>
// )
// export default AllPlayer

import React from 'react'
import PlayerAPI from '../api'
import { Link } from 'react-router-dom'

const AllPlayer = () => (
  <div>
    <ul>
      {
        PlayerAPI.all().map(p => (
          <li key={p.id}>
            <Link to={`/player/${p.id}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

export default AllPlayer




# 从零开始创建一个react项目

## 前置条件
电脑安装了 nodejs 和 webpack

## 创建项目

1、全局安装脚手架：
$ npm install -g create-react-app

2、通过脚手架搭建项目：
$ create-react-app <项目名称>  
例：create-react-app react-demo

3、开始项目：
$ cd <项目名>
例：cd react-demo
$ npm run start

如上三步，一个react项目已经创建成功，打开localhost:3000即可看到项目首页面

## 使用react-router
React Router已被拆分成三个包：react-router,react-router-dom和react-router-native。你不需要直接安装react-router，react-router包提供核心的路由组件与函数。其余两个提供运行环境（浏览器与react-native）所需的特定组件，但是他们都暴露出react-router中暴露的对象与方法。你应该为你的环境选择正确的包。我们进行的是网站（将会运行在浏览器）构建，所以应安装react-router-dom。

1、安装
$ cnpm install -save react-router-dom

2、使用
在index.js中，作如下修改

```
// ReactDOM.render(<App />, document.getElementById('root'));

import { BrowserRouter } from 'react-router-dom'
ReactDOM.render((
  <BrowserRouter>
    <App></App>
  </BrowserRouter>
), document.getElementById('root'))
```

此时打开页面，虽然显示同之前一样，但是我们已经引入了react-router

3、添加组件和路由
假设我们有3个页面，分别是home，player，playerDetail,他们的路由像下面这样<br/>

/home -------home页<br/>
/player -----player页<br/>
/player/1 ---playerDetail页，后面的数字代表player的id<br/>

而我们的页面结构为通用的上下结构，上面是固定的nav导航，我们定义为Header组件，下面是main主体，根据url不同，展示不同的内容

首先，创建 components 文件夹，先实现 Header 组件 components/Header.js
```
import React from 'react'
import { Link } from 'react-router-dom'

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
```
Link组件相当于react-router的专属a标签，用于路由跳转，有一套自己的使用规则。<Link>使用to参数来描述他们应该导航到的位置。这可以是字符串或位置对象（包含路径名，search，hash和state的组合）。



再实现 Main 组件 components/Main.js
```
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import AllPlayer from './AllPlayer'
import Player from './Player'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/player' component={AllPlayer}/>
      <Route path='/player/:id' component={Player}/>
    </Switch>
  </main>
)
export default Main
```

<Route>组件是 React Router 的主要构件模块，任何你想渲染的与 pathname 匹配的地方，你都应该创建一个<Route>元素。
一个<Route>需要一个 path 的字符串参数来描述路由匹配的路径名类型，例如，<Route path ='/roster' />应该匹配以/roster开头的路径名。 当前位置的路径与 path 匹配时，路由将渲染一个React元素。

<Route> 里的 React元素分以下三种：
```
// a、component  —  一个React组件。当带有component 参数的路由匹配时，路由将返回一个新元素，其类型是一个React component （使用React.createElement创建）。
<Route path='/page' component={Page} /> 


// b、render  —  一个返回React元素的函数[5]。它将在path匹配时被调用。这与component类似，但对于 内联渲染 和 更多参数传递 很有用。
const extraProps = { color: 'red' }
<Route path='/page' render={(props) => (  
  <Page {...props} data={extraProps}/>
)}/>


// c、children  — 一个返回React元素的函数。与之前的两个参数不同，无论路由的路径是否与当前位置相匹配，都将始终被渲染。
<Route path='/page' children={(props) => (
  props.match
    ? <Page {...props}/>
    : <EmptyPage {...props}/>
)}/>
```

通常，我们会选择conmponent或render。children参数偶尔会用上，但通常最好在路径不匹配时不渲染任何东西。在这里我们没有任何额外的参数传递给组件，因此我们的每个<Route>将使用component参数。

<Route> 的 exact 属性用于指定 path 是否需要绝对匹配才会跳转。以 main 组件为例，对于 player 页面，我们要 path 绝对等于'/player'时才跳转，所以写法为<Route exact path='/player' component={AllPlayer}/>，而对于 playerDetail 页面，只需前面部分为 '/player/'，后面还跟了其他的内容，所以没有指定 exact


组件写好了，便可以把它们放到一个页面里了

App.js
```
import React from 'react'
import Header from './components/Header'
import Main from './components/Main'

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App
```

但此时我们却不能正常打开页面，因为我们在Main里面用到的组件还没实现，为了便于看到效果，我们可以先把组件定义出来，随便写点内容

components/Home.js
```
import React from 'react'

const Home = () => (
  <div>
    <h1>我是主页</h1>
  </div>
)

export default Home
```

components/AllPlayer.js
```
import React from 'react'

const AllPlayer = () => (
  <div>
    <h1>我是player页</h1>
  </div>
)

export default AllPlayer
```

components/Player.js
```
import React from 'react'

const Player = () => (
  <div>
    <h1>我是playerDetail页</h1>
  </div>
)

export default Player
```

好了，如果你操作没错，此时应该可以正常访问页面了，并且点击header里的导航也能正确跳转了


接下来，我们就模拟一些数据，让我们在 player 页面有一个列表，点击列表跳到对应的详情页

首先，我们先定义数据，创建一个 api 文件夹，在里面新建 index.js
```
const PlayerAPI = {
  players: [
    { id: 1, name: "Ben Blocker", position: "G" },
    { id: 2, name: "Dave Defender", position: "D" },
    { id: 3, name: "Sam Sweeper", position: "D" },
    { id: 4, name: "Matt Midfielder", position: "M" },
    { id: 5, name: "William Winger", position: "M" },
    { id: 6, name: "Fillipe Forward", position: "F" }
  ],
  // 返回全部列表
  all: function() { return this.players},
  // 根据id 返回指定对象
  get: function(id) {
    const isPlayer = p => p.id === id
    return this.players.find(isPlayer)
  }
}

export default PlayerAPI
```

修改 AllPlayer 组件如下：
```
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
```

此时，我们已经渲染除了所有 player 列表，并且点击列表的每一项，都会跳转到 /player/${p.id}，这时，我们只需在 Player 组件中拿到传递的 id，再根据id 匹配出相应的 player ,即可展示他的信息

修改 Player 组件如下：
```
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
```

说一下这里的props，props 是组件接收到的参数，props.match 就是指通过路径匹配获取到的参数信息，包含如下内容：

> params - （object）从对应于路径的动态段的URL解析的键/值对<br/>
> isExact - （boolean）true如果整个URL匹配（没有尾随字符<br/>
> path - （string）用于匹配的路径模式。作用于构建嵌套的<Route><br/>
> url - （string）URL的匹配部分。作用于构建嵌套的<Link><br/>

所以，这里的 params.id，得跟路径定义里的名字对应起来，如果我们一开始的路径定义为 <Route path='/player/:number' component={Player}/>，则我们这里获取的时候也应该改为 props.match.params.number







# 如何在同一台电脑上使用多个github账户
打开gitbash，不是cmd，在命令框搜索出gitbash,打开

.ssh文件夹所在目录

C:\Users\Administrator



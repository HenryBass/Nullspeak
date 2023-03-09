import './App.css';
import Menu from './Menu.js'
import Feed from './Feed.js'
import Upload from './Upload.js'
import SearchRes from './SearchRes.js'
import About from './About.js'
import Comments from './Comments.js'

import {Route, Routes} from "react-router-dom"

function App() {

  return (
    <div className='App'>
    <Menu />
    <div className='PageBody'>
      <Routes>
      <Route path="/" element={<Feed/>}>
      </Route>
      <Route path="/search" element={<SearchRes/>}>
      </Route>
      <Route path="/post" element={<Upload/>}>
      </Route>
      <Route path="/about" element={<About/>}>
      </Route>
      <Route path="/comments" element={<Comments/>}>
      </Route>
      </Routes>
    </div>
    </div>
  );
}

export default App;
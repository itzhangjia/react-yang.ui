import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss"
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import IconExample from "./icon"
import DialogExample from './dialog';
// import ButtonExample from './lib/button.example';
import LayoutExample from './layout';


ReactDOM.render(
  <Router>
    <div>
      <header>
        <div className="logo">
          yang
        </div>

      </header>
      <div>
        <aside>
          <h2>组件</h2>
          <ul>
            <li>
              <Link to="/icon">Icon</Link>
            </li>
            {/* <li>
              <Link to="/button">Button</Link>
            </li> */}
            <li>
              <Link to="/dialog">对话框</Link>
            </li>
            <li>
              <Link to="/layout">布局</Link>
            </li>
          </ul>
        </aside>
        <main>
          <Route path="/icon" component={IconExample}/>
           {/* <Route path="/button" component={ButtonExample}/> */}
          <Route path="/dialog" component={DialogExample}/>
          <Route path="/layout" component={LayoutExample}/> 
        </main>
      </div>
    </div>
  </Router>
  , document.querySelector('#root'));
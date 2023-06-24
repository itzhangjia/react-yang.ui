import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss"
import "./page.scss"
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import IconExample from "./icon"
import DialogExample from './dialog';
// import ButtonExample from './lib/button.example';
import LayoutExample from './layout';
import Layout, {Content, Footer, Header, Sider} from './layout/layout';
const yang=require("./yang.png")

ReactDOM.render(
  <Router>
    <Layout>
      <Header className="side-header">
        <div className="side-logo">
          <img style={{width:50}} src={yang} alt="" /><span>yang</span>
        </div>
      </Header>
      <Layout>
        <Sider className="side-sider">
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
        </Sider>
        <Content className="side-main">
          <Route path="/icon" component={IconExample}/>
           {/* <Route path="/button" component={ButtonExample}/> */}
          <Route path="/dialog" component={DialogExample}/>
          <Route path="/layout" component={LayoutExample}/> 
        </Content>
      </Layout>
      <Footer className="side-footer">123</Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));
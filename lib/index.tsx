import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss"
import "./page.scss"
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import IconExample from "./icon/iconDemo"
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
      <Layout className="side-page">
        <Sider className="side-sider">
          <h2>组件</h2>
          <ul>
            <li>
              <NavLink to="/icon">Icon</NavLink>
            </li>
            {/* <li>
              <Link to="/button">Button</Link>
            </li> */}
            <li>
              <NavLink to="/dialog">对话框</NavLink>
            </li>
            <li>
              <NavLink to="/layout">布局</NavLink>
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
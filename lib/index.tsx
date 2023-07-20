import React from 'react';
import ReactDOM from 'react-dom';
import "./index.scss"
import "./page.scss"
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import IconExample from "./icon/iconDemo"
import DialogExample from './dialog/dialogDemo';
// import ButtonExample from './lib/button.example';
import LayoutExample from './layout/layoutDemo';
import Layout, { Content, Footer, Header, Sider } from './layout/layout';
import FormExample from './form/form.example';
import ScrollExample from './scroll/scroll.example';
import TreeExample from './tree/tree.example';
import CitySelectExample from './citySelect/citySelect.examle';
const yang = require("./yang.png")

ReactDOM.render(
  <Router>
    <Layout>
      <Header className="side-header">
        <div className="side-logo">
          <img style={{ width: 50 }} src={yang} alt="" /><span>yang</span>
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
            <li>
              <NavLink to="/form">表单</NavLink>
            </li>
            <li>
              <NavLink to="/scroll">Scroll</NavLink>
            </li>
            <li>
              <NavLink to="/tree">tree</NavLink>
            </li>
            <li>
              <NavLink to="/city">city</NavLink>
            </li>
          </ul>
        </Sider>
        <Content className="side-main">
          <Route path="/icon" component={IconExample} />
          {/* <Route path="/button" component={ButtonExample}/> */}
          <Route path="/dialog" component={DialogExample} />
          <Route path="/layout" component={LayoutExample} />
          <Route path="/form" component={FormExample} />
          <Route path="/scroll" component={ScrollExample} />
          <Route path="/tree" component={TreeExample} />
          <Route path="/city" component={CitySelectExample} />

        </Content>
      </Layout>
      <Footer className="side-footer">123</Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));
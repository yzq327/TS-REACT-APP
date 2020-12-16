import React from "react";
import { Route, Link } from "react-router-dom";
import { Layout, Menu, ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import Employee from "./employee";
import Setting from "./setting";
import "./App.css";

const { Header, Content, Footer } = Layout;

const App = ({ match }: any) => {
  let defaultUrl = match.url.replace("/", " ") || "employee";

  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="app">
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[defaultUrl]}
          >
            <Menu.Item key="employee">
              <Link to="/employees">员工管理</Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="/setting">系统设置</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="content">
          <div>
            <Route path="/" exact component={Employee} />
            <Route path="/employees" component={Employee} />
            <Route path="/setting" component={Setting} />
          </div>
        </Content>
        <Footer className="footer"> TypeScript in Action</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;

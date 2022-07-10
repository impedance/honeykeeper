import { Col, Layout, Row } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { useState } from 'react';
import "antd/dist/antd.css";
import React from 'react';
import './App.css';


const App: React.FC = () => {

  const cols = [];
  const colCount = 4;

  for (let i = 0; i < colCount; i++) {
    cols.push(
      <Col key={i.toString()} span={24 / colCount}>
        <div>Column</div>
      </Col>
    );
  }
  return (
    <Layout>
      <Row>
        <Header className='accounts-area'>Header</Header>
      </Row>
      <Content className='content'>
        <Row gutter={[16, 16]}>
          {cols}
          {cols}
        </Row>
        Another Row:
        <Row gutter={[16, 16]}>{cols}</Row>
      </Content>
      <Row>
        <Col>
          <Footer className='footer'>Footer</Footer>
        </Col>
      </Row>
    </Layout>
  );
}

export default App;

import { Col, Layout, Row } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import React, { useState } from 'react';
import './App.css';


const App: React.FC = () => {

  const [items, setItems] = useState<JSX.Element[]>([]);

  const addItem = () => {
    const newItem =
      <Col span={6}>
        <div>Item</div>
      </Col>
    setItems([...items, newItem])
  }

  return (
    <Layout>
      <Row>
        <Col>
          <Header className='accounts-area' onClick={addItem}>Header</Header>
        </Col>
      </Row>
      <Content className='content'>
        <Row gutter={[32, 32]}>
          {items}
        </Row>
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

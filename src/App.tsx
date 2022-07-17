import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import "antd/dist/antd.css";
import React, { useState } from "react";
import "./App.css";

//interface IAccount {
// name: string,
//amount: number
//}

const BudgetItem = () => {
  const [name, setName] = useState<string>("Default name");
  const [amount, setAmount] = useState<number>(10);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const handleClick = () => {
    setIsChanging(!isChanging);
  };

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setAmount(value);
  };
  return (
    <Col span={6}>
      <div className="budget-item">
        <p>{name}</p>
        <p>{amount}</p>
        <button onClick={handleClick}>
          {isChanging ? "enough" : "change amount"}
        </button>
        {isChanging && <input onChange={handleChange} value={amount}></input>}
      </div>
    </Col>
  );
};

const App: React.FC = () => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const addItem = () => {
    setItems([...items, <BudgetItem key={items.length + 1} />]);
  };

  return (
    <Layout>
      <Row>
        <Col>
          <Header onClick={addItem}>
            <div className="accounts-area">Header</div>
          </Header>
        </Col>
      </Row>
      <Content className="content">
        <Row gutter={[32, 32]}>{items}</Row>
      </Content>
      <Row>
        <Col>
          <Footer className="footer">Footer</Footer>
        </Col>
      </Row>
    </Layout>
  );
};

export default App;

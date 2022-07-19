import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import "antd/dist/antd.css";
import React, { FC, useState } from "react";
import "./App.css";
import uniqid from 'uniqid';

interface IBudgetItem {
  budgetId: number
  amount?: number
  updateBudget: (id: string, budgetedAmount: number) => void
}

const BudgetItem: FC<IBudgetItem> = ({ budgetId, amount }) => {
  const [name, setName] = useState<string>("Default name");
  // const [amount, setAmount] = useState<number>(10);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const handleClick = () => {
    setIsChanging(!isChanging);
  };

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    // setAmount(value);
  };
  return (
    <Col span={6} key={budgetId}>
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

const budgetsAmounts = {
  abc: {
    amount: 100
  }
}

const getAmount = (id: string) => {
  return budgetsAmounts['abc'].amount;
}

const App: React.FC = () => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [budgetAmounts, setBudgetAmounts] = useState<{}>({});

  const budgetId = items.length + 1;
  const changeAmount = (id: string, budgetedAmount: number) => {
    const newTotal = totalAmount - budgetedAmount;
    setTotalAmount(newTotal);
    setBudgetAmounts({ ...budgetAmounts, [id]: { amount: budgetedAmount } })
  }
  const addItem = () => {
    const amount = budgetsAmounts['abc'].amount;
    setItems([...items, <BudgetItem key={budgetId} budgetId={budgetId} updateBudget={changeAmount} amount={amount} />])
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

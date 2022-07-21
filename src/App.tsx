import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import "antd/dist/antd.css";
import React, { FC, useState } from "react";
import "./App.css";
import uniqid from 'uniqid';

interface IBudgetItem {
  budgetId: number
  amount?: number
  updateBudget: (id: number, budgetedAmount: number) => void
}

const BudgetItem: FC<IBudgetItem> = ({ budgetId, amount, updateBudget }) => {
  const [name, setName] = useState<string>("Default name");
  // const [amount, setAmount] = useState<number>(10);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const handleClick = () => {
    setIsChanging(!isChanging);
  };

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    updateBudget(budgetId, 100)
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


const App: React.FC = () => {
  const [items, setItems] = useState<JSX.Element[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [budgetAmounts, setBudgetAmounts] = useState<{ [key: number]: { amount: number } }>({});

  const budgetId = (items.length + 1) - 1;
  const changeAmount = (id: number, newAmount: number) => {
    console.log(id, newAmount)
    const newTotal = totalAmount - newAmount;
    setTotalAmount(newTotal);
    setBudgetAmounts({ ...budgetAmounts, [id]: { amount: newAmount } })
  }
  const addItem = () => {
    setBudgetAmounts({ ...budgetAmounts, [budgetId]: { amount: 100 } })
    const { amount } = budgetAmounts[budgetId] || 0;
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

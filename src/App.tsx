import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import "antd/dist/antd.css";
import React, { FC, useState } from "react";
import "./App.css";
import { BudgetCard } from "./BudgetCard";

const App: FC = () => {
  type BudgetItem = {
    title: string;
    amount: number;
  };

  const [totalAmount, setTotalAmount] = useState<number>(1000);
  const [budgets, setBudgets] = useState<{ [key: string]: BudgetItem }>({});
  const [counter, setCounter] = useState<number>(0);

  const changeBudgetAmount = (id: string, sum: number) => {
    const { amount } = budgets[id];
    const newBudget = { ...budgets[id], amount: amount + sum };
    setTotalAmount(totalAmount - sum);
    setBudgets({ ...budgets, [id]: newBudget });
  };

  const addBudget = () => {
    const newBudget: BudgetItem = { title: "hello", amount: 0 };
    setBudgets({ ...budgets, [counter]: newBudget });
    setCounter(counter + 1);
  };

  const budgetItems = Object.entries(budgets).map(([key, value]) => {
    const { amount, title } = value;
    return (
      <BudgetCard
        amount={amount}
        key={key}
        budgetId={key}
        title={title}
        changeAmount={changeBudgetAmount}
      />
    );
  });

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <Header onClick={addBudget}>
            <div className="accounts-area">
              <div className="total-amount">{totalAmount}</div>
            </div>
          </Header>
        </Col>
      </Row>
      <Content className="content">
        <Row gutter={[32, 32]}>{budgetItems}</Row>
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

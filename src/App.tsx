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
    selected: boolean;
  };

  const [totalAmount, setTotalAmount] = useState<number>(1000);
  const [budgets, setBudgets] = useState<{ [key: string]: BudgetItem }>({});
  const [counter, setCounter] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string>("");

  const changeBudgetAmount = (id: string, sum: number) => {
    const { amount } = budgets[id];
    const newBudget = { ...budgets[id], amount: amount + sum };
    setTotalAmount(totalAmount - sum);
    setBudgets({ ...budgets, [id]: newBudget });
  };

  const addBudget = () => {
    const newBudget: BudgetItem = {
      title: "hello",
      amount: 0,
      selected: false,
    };
    setBudgets({ ...budgets, [counter]: newBudget });
    setCounter(counter + 1);
  };

  const deselect = (budgetId: string) => {
    const { selected } = budgets[budgetId];
    const newSelectedBudget = { ...budgets[budgetId], selected: !selected };
    if (selectedId) {
      const previousSelectedBudget = {
        ...budgets[selectedId],
        selected: false,
      };
      setBudgets({
        ...budgets,
        [selectedId]: previousSelectedBudget,
        [budgetId]: newSelectedBudget,
      });
    } else {
      setBudgets({ ...budgets, [budgetId]: newSelectedBudget });
    }
    setSelectedId(budgetId);
  };

  const budgetItems = Object.entries(budgets).map(([key, value]) => {
    const { amount, title, selected } = value;
    return (
      <BudgetCard
        amount={amount}
        key={key}
        budgetId={key}
        title={title}
        changeAmount={changeBudgetAmount}
        selected={selected}
        deselect={deselect}
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
              <div>selected: {selectedId}</div>
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

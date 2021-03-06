import { Form, Input, Button, Col, Layout, Row } from "antd";
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
  const [sumToGet, setSumToGet] = useState<number>(0);
  const [sumToReturn, setSumToReturn] = useState<number>(0);

  enum Operation {
    GET,
    RETURN,
  }
  const handleChange = (
    event: { target: { value: any } },
    operation: Operation
  ) => {
    const { value } = event.target;
    const sum = Number(value);
    if (operation === Operation.GET) {
      setSumToGet(sum);
    } else {
      setSumToReturn(sum);
    }
  };

  const changeBudgetAmount = (id: string, sum: number) => {
    const { amount } = budgets[id];
    const newBudget = { ...budgets[id], amount: amount + sum };
    setTotalAmount(totalAmount - sum);
    setBudgets({ ...budgets, [id]: newBudget });
  };
  const getSum = () => {
    changeBudgetAmount(selectedId, sumToGet);
  };
  const returnSum = () => {
    changeBudgetAmount(selectedId, -sumToReturn);
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
    setSelectedId(budgetId === selectedId ? "" : budgetId);
  };

  const budgetItems = Object.entries(budgets).map(([key, value]) => {
    const { amount, title, selected } = value;
    return (
      <BudgetCard
        amount={amount}
        key={key}
        budgetId={key}
        title={title}
        selected={selected}
        deselect={deselect}
      />
    );
  });

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <div className="accounts-area">
            <div className="total-amount">{totalAmount}</div>
            <Button onClick={addBudget}>add new card</Button>
            <div>selected: {selectedId}</div>
            {selectedId && (
              <Form>
                <Form.Item>
                  <Row>
                    <Col>
                      <Button onClick={getSum}>Get sum</Button>
                    </Col>
                    <Col span={6}>
                      <Input
                        value={sumToGet}
                        onChange={(event) => handleChange(event, Operation.GET)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Row>
                    <Col>
                      <Button onClick={returnSum}>Return sum</Button>
                    </Col>
                    <Col span={6}>
                      <Input
                        value={sumToReturn}
                        onChange={(event) =>
                          handleChange(event, Operation.RETURN)
                        }
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            )}
          </div>
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

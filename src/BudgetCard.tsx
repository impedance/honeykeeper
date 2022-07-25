import React, { FC, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";

interface Props {
  budgetId: string;
  amount: number;
  title?: string;
  selected: boolean;
  changeAmount: (id: string, budgetedAmount: number) => void;
  deselect: (id: string) => void;
}
enum Operation {
  GET,
  RETURN,
}

export const BudgetCard: FC<Props> = ({
  amount,
  title,
  budgetId,
  changeAmount,
  selected,
  deselect
}) => {
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [currentAmount, setCurrentAmount] = useState<number>(amount || 0);
  const [sumToGet, setSumToGet] = useState<number>(0);
  const [sumToReturn, setSumToReturn] = useState<number>(0);

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

  const getSum = () => {
    changeAmount(budgetId, sumToGet);
  };
  const returnSum = () => {
    changeAmount(budgetId, -sumToReturn);
  };
  return (
    <Col span={8} onClick={() => deselect(budgetId)}>
      <div className={`budget-item ${selected ? "selected-budget" : ""}`}>
        <p>
          {title}----{amount}
        </p>
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
                  onChange={(event) => handleChange(event, Operation.RETURN)}
                />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Col>
  );
};

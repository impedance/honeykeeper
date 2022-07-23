import React, { FC, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";

interface Props {
  budgetId: string;
  amount?: number;
  title?: string;
  changeAmount: (id: string, budgetedAmount: number) => void;
}

export const BudgetCard: FC<Props> = ({
  amount,
  title,
  budgetId,
  changeAmount,
}) => {
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [currentAmount, setCurrentAmount] = useState<number>(amount || 0);

  const handleClick = () => {
    //   console.log(sumToGet)
    setIsChanging(!isChanging);
    // changeAmount(budgetId, value);
  };

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    // setAmount(value);
  };
  return (
    <Col span={6}>
      <div className="budget-item">
        <p>{title}----{currentAmount}</p>
        <Form>
          <Form.Item>
            <Row>
              <Col>
                <Button onClick={handleClick}>Get sum</Button>
              </Col>
              <Col span={6}>
                <Input name="sumToGet" />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col>
                <Button onClick={handleClick}>Return sum</Button>
              </Col>
              <Col span={6}>
                <Input />
              </Col>
            </Row>
          </Form.Item>
        </Form>
        {isChanging && <input onChange={handleChange}></input>}
      </div>
    </Col>
  );
};

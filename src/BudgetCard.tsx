import React, { FC, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";

interface Props {
  budgetId: string;
  amount: number;
  title?: string;
  selected: boolean;
  deselect: (id: string) => void;
}

export const BudgetCard: FC<Props> = ({
  amount,
  title,
  budgetId,
  selected,
  deselect
}) => {
  const [currentAmount, setCurrentAmount] = useState<number>(amount || 0);
  return (
    <Col span={8} onClick={() => deselect(budgetId)}>
      <div className={`budget-item ${selected ? "selected-budget" : ""}`}>
        <p>
          {title}----{amount}
        </p>
      </div>
    </Col>
  );
};

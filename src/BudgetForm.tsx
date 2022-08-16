import React, { FC, useState } from 'react'
import { Form, Input, Button, Col, Row } from 'antd'
import { Operation } from './App'

interface Props {
  getSum: () => void
  sumToGet: number
  operation: typeof Operation
  returnSum: () => void
  handleChange: (
    event: { target: { value: any } },
    operation: Operation,
  ) => void
  sumToReturn: number
}

export const BudgetForm: FC<Props> = ({
  getSum,
  sumToGet,
  operation,
  returnSum,
  sumToReturn,
  handleChange,
}) => (
  <Form>
    <Form.Item>
      <Row>
        <Col>
          <Button onClick={getSum}>Get sum</Button>
        </Col>
        <Col span={6}>
          <Input
            value={sumToGet}
            onChange={(event) => handleChange(event, operation.GET)}
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
            onChange={(event) => handleChange(event, operation.RETURN)}
          />
        </Col>
      </Row>
    </Form.Item>
  </Form>
)

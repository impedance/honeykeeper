import { Input, Button, Col, Layout, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import 'antd/dist/antd.css'
import { FC, useState } from 'react'
import './App.css'
import { BudgetCard } from './BudgetCard'
import { BudgetForm } from './BudgetForm'

export enum Operation {
  GET,
  RETURN,
  SPEND,
}
const App: FC = () => {
  type BudgetItem = {
    title: string
    amount: number
    selected: boolean
  }

  const [sberAccount, setSberAccount] = useState<number>(10000)
  const [totalAmount, setTotalAmount] = useState<number>(sberAccount)
  const [budgets, setBudgets] = useState<{ [key: string]: BudgetItem }>({})
  const [counter, setCounter] = useState<number>(0)
  const [selectedId, setSelectedId] = useState<string>('')
  const [sumToGet, setSumToGet] = useState<number>(0)
  const [sumToReturn, setSumToReturn] = useState<number>(0)
  const [sumToSpend, setSumToSpend] = useState<number>(0)

  const handleChange = (
    event: { target: { value: any } },
    operation: Operation,
  ) => {
    const { value } = event.target
    const sum = Number(value)
    if (operation === Operation.GET) {
      setSumToGet(sum)
    } else {
      setSumToReturn(sum)
    }
    if (operation === Operation.SPEND) {
      setSumToSpend(sum)
    }
  }

  const changeBudgetAmount = (id: string, sum: number) => {
    const { amount } = budgets[id]
    const newBudget = { ...budgets[id], amount: amount + sum }
    setTotalAmount(totalAmount - sum)
    setBudgets({ ...budgets, [id]: newBudget })
  }

  const getSum = () => {
    changeBudgetAmount(selectedId, sumToGet)
  }

  const returnSum = () => {
    changeBudgetAmount(selectedId, -sumToReturn)
  }

  const spendFromBudget = () => {
    const { amount } = budgets[selectedId]
    const newBudget = { ...budgets[selectedId], amount: amount - sumToSpend }
    setBudgets({ ...budgets, [selectedId]: newBudget })
    setSberAccount(sberAccount - sumToSpend)
  }

  const addBudget = () => {
    const newBudget: BudgetItem = {
      title: 'hello',
      amount: 0,
      selected: false,
    }
    setBudgets({ ...budgets, [counter]: newBudget })
    setCounter(counter + 1)
  }

  const deselect = (budgetId: string) => {
    const { selected } = budgets[budgetId]
    const newSelectedBudget = { ...budgets[budgetId], selected: !selected }
    if (selectedId) {
      const previousSelectedBudget = {
        ...budgets[selectedId],
        selected: false,
      }
      setBudgets({
        ...budgets,
        [selectedId]: previousSelectedBudget,
        [budgetId]: newSelectedBudget,
      })
    } else {
      setBudgets({ ...budgets, [budgetId]: newSelectedBudget })
    }
    setSelectedId(budgetId === selectedId ? '' : budgetId)
  }

  const budgetItems = Object.entries(budgets).map(([key, value]) => {
    const { amount, title, selected } = value
    return (
      <BudgetCard
        amount={amount}
        key={key}
        budgetId={key}
        title={title}
        selected={selected}
        deselect={deselect}
      />
    )
  })

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <div className="accounts-area">
            <div className="total-amount">
              {totalAmount}*****{sberAccount}
            </div>
            <Button onClick={addBudget}>add new card</Button>
            <div>selected: {selectedId}</div>
            {selectedId && (
              <BudgetForm
                getSum={getSum}
                returnSum={returnSum}
                sumToReturn={sumToReturn}
                sumToGet={sumToGet}
                operation={Operation}
                handleChange={handleChange}
              />
            )}
          </div>
        </Col>
      </Row>
      <Content className="content">
        <Row gutter={[32, 32]}>{budgetItems}</Row>
      </Content>
      <Row>
        <Col span={24}>
          <div className="spending-area">
            <Row>
              <Col>
                <Button onClick={spendFromBudget}>Spend</Button>
              </Col>
              <Col span={6}>
                <Input
                  value={sumToSpend}
                  onChange={(event) => handleChange(event, Operation.SPEND)}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}

export default App

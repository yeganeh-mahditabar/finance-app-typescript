import { useState } from "react"
import { Transaction } from "./Transactions"


function ExpenseTracker() {
  
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [text, setText] = useState("")
  const [amount, setAmount] = useState("")

  function addTransaction(){
    if(!text || !amount) return
    const newTransaction : Transaction = {
        id: Date.now(),
        text,
        amount: parseFloat(amount)
    }
    setTransactions([newTransaction, ...transactions])
    setText("")
    setAmount("")
  }
    
  return (
    <div className="expense-container">
            <h2>💰 Expense Tracker</h2>
            <h3>Balance: $0</h3>
            <div className="summary">
                <div className="income">Income: $0</div>
                <div className="expense">Expense: $0</div>
            </div>
            <div className="add-transaction">
                <input type="text" placeholder="Enter description" value={text} onChange={(e)=>setText(e.target.value)} />
                <input type="number" placeholder="Enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)} />
                <button onClick={addTransaction}>Add Transaction</button>
            </div>
            <ul className="transactions">
            </ul>
        </div>
  )
}

export default ExpenseTracker
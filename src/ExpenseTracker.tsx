import {  useState } from "react";
import { Transaction } from "./Transactions";
import { getData, setData, LOCAL_STORAGE_KEY } from "./localStorage";



function ExpenseTracker() {
  
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return getData<Transaction[]>(LOCAL_STORAGE_KEY) || [];
  });

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  
  function addTransaction(){
    if(!text || !amount) return;
    const newTransaction : Transaction = {
        id: Date.now(),
        text,
        amount: parseFloat(amount)
    };
    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    setData(LOCAL_STORAGE_KEY, updated);
    setText("");
    setAmount("");
  }

  function deleteTransaction(id: number){
    const updated = transactions.filter((item) => item.id !== id);
    setTransactions(updated);
    setData(LOCAL_STORAGE_KEY, updated);
  }

  let total = 0;
  transactions.map((item)=>total += item.amount);

  let income = 0;
  let expense = 0;
  transactions.map((item)=>{
    if(item.amount>0){
      income += item.amount
    }else{
      expense += item.amount
    }
  })
    
  return (
    <div className="expense-container">
            <h2>💰 Expense Tracker</h2>
            <h3>Balance: ${total}</h3>
            <div className="summary">
                <div className="income">Income: ${income}</div>
                <div className="expense">Expense: ${expense}</div>
            </div>
            <div className="add-transaction">
                <input type="text" placeholder="Enter description" value={text} onChange={(e)=>setText(e.target.value)} />
                <input type="number" placeholder="Enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)} />
                <button onClick={addTransaction}>Add Transaction</button>
            </div>
            <ul className="transactions">
                {
                    transactions.map((item, id)=>(
                        <li className={item.amount > 0 ? "income" : "expense"} key={id}>{item.text} * {item.amount}
                        <button onClick={()=>deleteTransaction(item.id)}>❌</button>
                        </li>
                    ))
                }
            </ul>
        </div>
  )
}

export default ExpenseTracker
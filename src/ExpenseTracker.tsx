import { useMemo, useState } from "react";
import { Transaction } from "./Transactions";
import { getData, setData, LOCAL_STORAGE_KEY } from "./localStorage";

function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return getData<Transaction[]>(LOCAL_STORAGE_KEY) || [];
  });

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  function addTransaction() {
    if (!text || !amount) return;
    const newTransaction: Transaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
    };
    const updated = [newTransaction, ...transactions];
    setTransactions(updated);
    setData(LOCAL_STORAGE_KEY, updated);
    setText("");
    setAmount("");
  }

  function deleteTransaction(id: number) {
    const updated = transactions.filter((item) => item.id !== id);
    setTransactions(updated);
    setData(LOCAL_STORAGE_KEY, updated);
  }

  const total = useMemo(() => {
    return transactions.reduce((sum, item) => sum + item.amount, 0);
  }, [transactions]);

  const { income, expense } = useMemo(() => {
    return transactions.reduce(
      (acc, item) => {
        if (item.amount > 0) {
          acc.income += item.amount;
        } else {
          acc.expense += item.amount;
        }
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [transactions]);

  return (
    <div className="expense-container">
      <h2>💰 Expense Tracker</h2>
      <h3>Balance: ${total}</h3>
      <div className="summary">
        <div className="income">Income: ${income}</div>
        <div className="expense">Expense: ${expense}</div>
      </div>
      <form
        className="add-transaction"
        onSubmit={(e) => {
          e.preventDefault();
          addTransaction();
        }}
      >
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
      <ul className="transactions">
        {transactions.map((item, id) => (
          <li className={item.amount > 0 ? "income" : "expense"} key={id}>
            {item.text} * {item.amount}
            <button onClick={() => deleteTransaction(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;

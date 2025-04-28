

function ExpenseTracker() {
  
    
    
  return (
    <div className="expense-container">
            <h2>💰 Expense Tracker</h2>
            <h3>Balance: $0</h3>
            <div className="summary">
                <div className="income">Income: $0</div>
                <div className="expense">Expense: $0</div>
            </div>
            <div className="add-transaction">
                <input type="text" placeholder="Enter description" />
                <input type="number" placeholder="Enter amount" />
                <button>Add Transaction</button>
            </div>
            <ul className="transactions">
            </ul>
        </div>
  )
}

export default ExpenseTracker
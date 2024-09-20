import React, { useState } from 'react';

const AddExpense = () => {
  // Adding Transaction 
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [showHistory, setShowHistory] = useState(false)

  //Setting Current Balance
  const [balance, setBalance] = useState(0)

  //Setting Income & Expense
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAmount = parseFloat(amount);

    if (name !== "" && amount !== "") {
      setBalance(prevBalance => prevBalance + newAmount);
      setTransactions([...transactions, { name, amount: newAmount }])
      setName("");
      setAmount("");
      setShowHistory(true)

      if (newAmount > 0) {
        setIncome(prevIncome => prevIncome + newAmount);
      } else {
        setExpense(prevExpense => prevExpense + newAmount);
      }
    }

    else {
      alert("Invalid Input")
    }
  };
  return (
    <div className='flex flex-col items-start justify-center gap-9 w-[350px]'>
      <h1 className='font-semibold'>Expense Tracker App</h1>
      <div>
        <p>Current Balance:</p>
        <h3 className='font-semibold text-4xl'>{balance.toFixed(2)}$</h3>
      </div>

      <div className='flex items-center justify-between w-full gap-6 text-[1rem] border border-black'>
        <div className='h-[90px] w-[50%] flex flex-col items-center justify-center'>
          <h1>Income</h1>
          <p className='text-green-600'>{`${income.toFixed(2)}$`}</p>
        </div>

        <div className='w-[1px] h-[60px] bg-black'></div>

        <div className='h-[90px] w-[50%] flex flex-col items-center justify-center'>
          <h1>Expense</h1>
          <p className='text-red-600'>{Math.abs(expense.toFixed(2))}$</p>
        </div>
      </div>

      {/* History  */}
      {showHistory && <div className={`w-full flex flex-col items-start justify-start gap-2
      ${(transactions.length) > 3 ? "h-[180px]" : "h-auto"}
      ${(transactions.length) > 3 ? "overflow-y-scroll" : "overflow-y-hidden"} `}>
        <h1 className='font-semibold'>History</h1>
        <div className='w-full h-[1px] bg-black'></div>

        {/* items  */}
        {transactions.map((transaction, index) => (
          <div key={index} className='border border-gray-300 text-[1rem] w-full flex items-center justify-between px-4'>
            <h1>{transaction.name}</h1>
            <p className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>{transaction.amount > 0 ? `+${transaction.amount.toFixed(2)}$` : `-${Math.abs(transaction.amount).toFixed(2)}$`}</p>
          </div>
        ))}
      </div>}

      <div className='w-full flex flex-col items-start justify-center gap-2'>
        <h1 className='font-semibold'>Add new transaction</h1>
        <div className='w-full h-[1px] bg-black'></div>
        <div className='flex flex-col text-[1rem] items-start justify-center w-full'>
          <h1 className='font-semibold'>Text</h1>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='bg-gray-200 px-2 w-full outline-none' placeholder='Enter Transaction...' />
        </div>
        <div className='flex flex-col text-[1rem] items-start justify-center w-full'>
          <h1 className='font-semibold'>Amount </h1>
          <div className='pb-2 text-xs'>(negative - expense, positive - income)</div>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} type="text" className='bg-gray-200 px-2 w-full outline-none' placeholder='Enter Amount...' />
        </div>

        <div className='flex items-center justify-center w-full pt-6'>
          <button onClick={handleSubmit} className='bg-black text-white px-4 py-2 text-sm rounded-full'>Add Transaction</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
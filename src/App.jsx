import React from 'react';
import Expense from './components/Expense'

const App = () => {
  return (
    <div className='flex flex-col gap-12 text-2xl items-center justify-center min-h-screen'>
      <Expense />
    </div>
  )
}

export default App
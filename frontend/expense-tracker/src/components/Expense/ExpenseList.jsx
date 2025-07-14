import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import { downloadExpensePDF } from '../../utils/pdfExport'

const ExpenseList = ({transactions, onDelete, onDownload, onPdfDownload}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>All Expenses</h5>
        
        <div className='p-2 mr-2 flex items-center justify-between'>
            <button onClick={() => downloadExpensePDF(onPdfDownload)} className="card-btn m-2">
                <LuDownload className='text-base' /> Download PDF
            </button>
            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' /> Download Excel
            </button>
        </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((expense) => (
                <TransactionInfoCard 
                    key={expense._id}
                    title={expense.category}
                    icon = {expense.icon}
                    date={moment(expense.date).format("Do MMM YYYY")}
                    amount={expense.amount}
                    type="expense"
                    onDelete={()=> onDelete(expense._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList
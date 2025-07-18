import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import { downloadIncomePDF } from '../../utils/pdfExport'

const IncomeList = ({transactions, onDelete, onDownload, onPdfDownload}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income Sources</h5>

            <div className='p-2 mr-2 flex items-center justify-between'>   
                <button onClick={() => downloadIncomePDF(onPdfDownload)} className="card-btn m-2">
                    <LuDownload className='text-base' /> Download PDF
                </button>
                <button className='card-btn' onClick={onDownload}>
                    <LuDownload  className='text-base'/> Download
                </button>
            </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((income) => (
                <TransactionInfoCard
                    key={income._id}
                    title={income.source}
                    icon={income.icon}
                    date={moment(income.date).format("DD MM YYYY")}
                    amount={income.amount}
                    type="income"
                    onDelete={() => onDelete(income._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList
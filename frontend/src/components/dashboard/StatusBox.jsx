import React from 'react'

const StatusBox = ({count, heading, groth, style='', children}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg  flex flex-col lg:flex-row gap-3 px-1 py-3 justify-center items-center shadow-md ${style}`}>
      <span className='h-14 w-14 rounded-full bg-green-100 flex justify-center text-green-600 items-center'>
        {children}
      </span>
      <span className='block justify-start text-center lg:text-start text-2xl font-bold'>
        {count}
        <h3 className='font-normal text-xs text-center lg:text-start'>{heading}</h3>
        <p className='font-normal'>{groth}</p>
      </span>
    </div>
  )
}

export default StatusBox

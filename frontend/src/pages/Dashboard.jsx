import React, { useEffect, useState } from 'react'
import PageHeader from '../components/layout/PageHeader'
import DateRangePicker from '../components/dashboard/DateRangePicker'
import StatusBox from '../components/dashboard/StatusBox'
import { ArrowUp, ScrollText } from 'lucide-react'
import PieChartComponent from '../components/dashboard/PieChart'
import LineChartComponent from '../components/dashboard/LineChart'
import AreaChartComponent from '../components/dashboard/AreaChart'
import OrderTable from '../components/order/OrderTable'


function Dashboard() {
  return (
    <>
      {/* page header */}
      <PageHeader page={'Dashboard'} disc={'Hi, Rabeeh. how are you'}>
        <DateRangePicker />
      </PageHeader>

      {/* status boxes */}
      <div className='flex gap-1 w-full mt-3 '>
        <StatusBox count={75} heading={'Total Orders'} style='w-full ' groth={
          <div className='flex justify-center items-center'>
            <span className='flex bg-green-100 p-1 rounded-full text-green-500'><ArrowUp size={10} /></span>
            <span className='text-[7px] sm:text-[9px]'>35% (30 days) </span>
          </div>
        } >
          <ScrollText />
        </StatusBox>
        <StatusBox count={75} heading={'Total Orders'} style='w-full ' groth={
          <div className='flex justify-center items-center'>
            <span className='flex bg-green-100 p-1 rounded-full text-green-500'><ArrowUp size={10} /></span>
            <span className='text-[7px] sm:text-[9px]'> 35% (30 days) </span>
          </div>
        } >
          <ScrollText />
        </StatusBox>
        <StatusBox count={75} heading={'Total Orders'} style='w-full ' groth={
          <div className='flex justify-center items-center'>
            <span className='flex bg-green-100 p-1 rounded-full text-green-500'><ArrowUp size={10} /></span>
            <span className='text-[7px] sm:text-[9px]'> 35% (30 days) </span>
          </div>
        } >
          <ScrollText />
        </StatusBox>
        <StatusBox count={75} heading={'Total Orders'} style='w-full ' groth={
          <div className='flex justify-center items-center'>
            <span className='flex bg-green-100 p-1 rounded-full '><ArrowUp size={10} /></span>
            <span className='text-[7px] sm:text-[9px]'> 35% (30 days) </span>
          </div>
        } >
          <ScrollText />
        </StatusBox>
      </div>

      {/* chats */}
      <div className='lg:flex gap-1 mt-3'>
        <div className='bg-backgroundPrimary w-full rounded-lg shadow-lg mt-2'>
          <PieChartComponent />
        </div>
        <div className='bg-backgroundPrimary w-full rounded-lg shadow-lg mt-2'>
          <AreaChartComponent />
        </div>
      </div>
      <div className='bg-backgroundPrimary min-w-full rounded-lg shadow-lg my-5 max-w-[40vw] md:max-w-[60vw] lg:max-w-[70vw] overflow-x-auto'>
        <LineChartComponent />
      </div>
      <div className='bg-backgroundPrimary min-w-full rounded-lg shadow-lg  max-w-[40vw] md:max-w-[60vw] lg:max-w-[70vw]'>
        <OrderTable />
      </div>

    </>
  )
}

export default Dashboard

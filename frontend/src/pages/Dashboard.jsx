import React from 'react'
import PageHeader from '../components/layout/PageHeader'
import DateRangePicker from '../components/dashboard/DateRangePicker'

function Dashboard() {
  return (
    <>
      <PageHeader page={'Dashboard'} disc={'Hi, Rabeeh. how are you'}>
      <DateRangePicker/>
      </PageHeader>
    </>
  )
}

export default Dashboard

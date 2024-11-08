import React from 'react'
import PageHeader from '../components/layout/PageHeader'
import OrderTable from '../components/order/OrderTable'

function OrderListPage() {
    return (
        <>
            <PageHeader page={'Orders'} disc={'You can manage orders'}></PageHeader>
            <div className='bg-backgroundPrimary border dark:border-none mt-3 min-w-full rounded-lg shadow-lg  max-w-[40vw] md:max-w-[60vw] lg:max-w-[70vw]'>
                <OrderTable />
            </div>
        </>
    )
}

export default OrderListPage

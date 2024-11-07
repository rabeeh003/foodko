import React from 'react'

const PageHeader = ({ page, disc, children }) => {
    return (
        <section className='flex justify-between items-center'>
            <span className='font-semibold text-xl'>
                {page}
                <p className='text-xs font-thin'>{disc}</p>
            </span>
            {children}
        </section>
    )
}

export default PageHeader

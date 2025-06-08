import React from 'react'
import { PricingTable } from '@clerk/nextjs';
function Billing() {
  return (
       <div>
       <h2 className='font-bold text-3xl text-center'>Choose Your Plan</h2>
       <p className='text-lg text-center'>Select a subscription</p>
       <PricingTable />
     </div>
  )
}

export default Billing

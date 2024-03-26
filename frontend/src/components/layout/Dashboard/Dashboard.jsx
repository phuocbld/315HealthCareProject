import React, { useRef, useEffect} from 'react'
import Layout from '../../../HOCs/Layout'
import LineTotal from './LineTotal/LineTotal'
import TotalHeThong from './TotalHeThong/TotalHeThong'
import ColumBranch from './ColumBranch/ColumBranch'
import TTV from './TTV/TTV'
const Dashboard = () => {
    
  return (
   <Layout>
        <div>
            <div className='m-3 '>
                <div className='flex gap-5'>
                    <div className='w-2/3 p-5 bg-white'>
                    <h2 className='font-semibold'>Tổng ca Khám: 1000 </h2>
                    <LineTotal />
                    </div>
                    <div className='w-1/3 p-5  bg-white'>
                        <TotalHeThong/>
                    </div>
                </div>
                <div className='flex gap-5 mt-5'>
                    <div className='w-1/2 p-5 bg-white'>
                    <h2 className='font-semibold'>Tổng doanh thu theo chi nhánh </h2>
                    <ColumBranch/>
                    </div>
                    <div className='w-1/2 p-5  bg-white'>
                        <TTV/>
                    </div>
                </div>
            </div>
            
        </div>
   </Layout>
  )
}

export default Dashboard
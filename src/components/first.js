import React from 'react'
import redBloodCell from '../assets/bloodcell.png'
import donation from '../assets/donation.png'
import chart from '../assets/chart1.png'

function First() {
  return (
    <>
      <div className='flex flex-col items-center overflow-hidden'>
        <div className='relative flex justify-center items-center scroll-mx-0'>
          <div className='absolute text-white flex flex-col'>
            <h1 className='text-center  text-3xl'>Heading 1</h1>
            <p className='mt-8 m-auto text-center justify-center w-[700px]'>Blood donation is a vital act of generosity, saving lives in emergencies, surgeries, and medical treatments. Donating blood is safe, simple, and greatly impactful. One donation can potentially save up to three lives, fostering a sense of community and solidarity in healthcare</p>
          </div>

          <img className='w-screen h-[421px] object-cover box-content mt-1' src={redBloodCell} alt="" />

        </div>
        <br></br>
        <div className='w-[1100px] text-center overflow-hidden'>
          <h2 className='text-red-600 text-xl'>LEARN ABOUT DONATION</h2>
          <br></br>
          <div className='flex justify-between text-center object-cover mt-2'>

            <img className='mt-3 h-60 max-w-[400px] object-cover block' src={donation} alt="" />
            <div className='h-[250px] justify-center max-w-[400px] iteam-center flex flex-col gap-3'>
              <p className='text-yellow-400 text-xl'><b>ONE</b></p>
              <p className='text-lg'>blood donation can save upto</p>
              <p className='text-yellow-400 text-xl'><b>THREE</b></p>
              <p className='text-lg'>patient lives</p>
            </div>

            <img className='mb-2 h-80  max-w-[320px] object-cover border-4 border-red-500' src={chart} alt="" />
          </div>

        </div>
      </div>
    </>
  )
}

export default First

import React from 'react'
import donation from '../assets/donation.png'
import chart from '../assets/chart.png'
function Second() {
  return (
    
// <<<<<<< HEAD
    <div className='w-screen flex justify-center overflow-hidden items-center'>
{/* ======= */}
    <div className='w-screen flex justify-center '>
{/* >>>>>>> 0e143431342c5069b6ea61c187ba88fd8adfb8cb */}
     
    <div className='w-[1100px] text-center '>
      <h2 className='text-red-600 text-xl mt-2'>LEARN ABOUT DONATION</h2>
      <div className='flex justify-evenly text-center object-cover '>

{/* <<<<<<< HEAD */}
      <img className='mt-5 h-[250px] max-w-[400px] object-cover block'src={donation} alt="" />
        <div className='h-[250px] justify-center max-w-[400px] iteam-center flex flex-col gap-4'>
{/* ======= */}
      <img className='mt-3 h-[300px] max-w-[400px] object-cover block'src="../second-icons/boold donation 1.png" alt="" />
        <div className='h-[300px] justify-center max-w-[400px] iteam-center flex flex-col gap-1'>
{/* >>>>>>> 0e143431342c5069b6ea61c187ba88fd8adfb8cb */}
            <p className='text-yellow-400'>one</p>
            <p>blood donation can save upto</p>
            <p className='text-yellow-400'>Three</p>
            <p>patient lives</p>
        </div>

{/* <<<<<<< HEAD */}
      <img className=' h-[250px] mt-5 max-w-[400px] object-cover'src={chart} alt="" />
{/* ======= */}
      <img className=' mt-3 h-[300px] max-w-[400px] object-cover'src="../second-icons/blood type 1.png" alt="" />
{/* >>>>>>> 0e143431342c5069b6ea61c187ba88fd8adfb8cb */}
      </div>
 
    </div>

    </div>
    </div>
  </div>
  )
}

export default Second;
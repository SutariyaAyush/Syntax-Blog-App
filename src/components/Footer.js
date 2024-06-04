import React from 'react'
import chart from '../assets/flat-map-icon-28.jpg'


function Footer() {
  return (

    <div className='h-[190px] bg-slate-800 flex justify-center'>

      <div className='flex w-screen justify-evenly mt-6'>
        <div className='text-white border-r-2 p-8 mb-3'>
          <pre>Contact Us</pre>
          <pre>9714030703</pre>
          <pre>sdsaddc@gmail.com</pre>

        </div>
        <div className='text-white border-r-2 p-8 mb-3'>
          <pre>Address</pre>
          <pre>A.D.Patel Institute Of Technology</pre>
        </div>

        <a href="https://maps.app.goo.gl/1QGJMyKGMFxMTPUL6">
          <img className='h-[150px] border-4 border-sky-500 flex justify-center items-center' src={chart} alt="" />
        </a>
      </div>


    </div>
  )
}

export default Footer
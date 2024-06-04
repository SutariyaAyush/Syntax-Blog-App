import React, { useEffect, useState } from 'react';
import about from '../assets/about.png';
import imp from '../assets/imp.jpg';
function About(req,res) {
    
    const [typingContent, setTypingContent] = useState('');

    useEffect(() => {
        const addTypingAnimation = () => {
            const text = "E-BloodBank";
            let tempContent = '';

            // Split the text into an array of characters and add each character with a delay
            text.split('').forEach((char, index) => {
                setTimeout(() => {
                    tempContent += char;
                    setTypingContent(tempContent);
                }, index * 200); // Adjust the delay as needed
            });
        };
        addTypingAnimation();
    }, []);

    return (
        <>
            <div className='my-8 text-center items-center'>
                <p className='text-2xl text-black bg-red-400 p-4 m-1 rounded-md mb-4'>
                    Welcome to <span className='font-bold text-green-300 typing-animation'>{typingContent}</span>, where compassion meets action! We are a passionate and dedicated team committed to making a positive impact on people's lives through the noble act of blood donation.
                </p>
                <div className='text-black'>
                    <p className='text-black mb-4 text-xl'>
                        Have you ever witnessed a relative or a close friend searching frantically for a blood donor? When blood banks say they are out of stock, and the donors you know are out of reach, time keeps ticking. Have you witnessed loss of life because a donor was not available at the most needed hour? This thought laid our foundation.
                    </p>
                    <p className='text-gray-700 mb-8 text-l'>
                        We strive to bridge the gap between donors and recipients, fostering a community that understands the critical importance of donating blood.
                    </p>
                </div>
                <hr></hr>
                <div className='bg-gray-200 p-4 rounded-md mb-4 flex flex-col md:flex-row items-center'>
                    <div className='mb-4 md:mb-0 md:mr-4 md:order-2'>
                        <img src={imp} alt="Important" className='max-w-full md:w-90 h-auto rounded-md shadow-lg' />
                    </div>
                    <h3 className='text-3xl font-bold mb-4 text-blue-500'>Why Blood Donation Matters</h3>
                    <p className='text-gray-800 text-xl'>
                        Every day, countless lives are saved because of the selfless act of blood donation. Whether it's for patients undergoing surgeries, individuals battling life-threatening illnesses, or emergency situations that demand immediate blood transfusions, your contribution can make a significant difference.
                    </p>

                </div>





            </div>


            <hr className='my-9 border-t-2 border-gray-200' />

            <div className='my-10'>
                <img src={about} alt="About" className='mx-auto rounded-md shadow-lg' />
            </div>

            <hr className='my-8 border-t-2 border-gray-200' />

            <div className='my-1 text-center bg-gray-200 p-10 rounded-md mb-4 items-center'>
                <h3 className='text-3xl font-bold mb-4 text-blue-500'>Join Us in the Journey</h3>
                <p className='text-gray-800 text-2xl'>
                    Whether you are an experienced blood donor or considering donating for the first time, E-BloodBank welcomes you with open arms. Together, we can create a world where no one has to suffer due to a shortage of blood.
                    <br></br>
                    <p>Register Now!!</p>
                </p>
            </div>
        
       
        </>
    );
}


export default About;

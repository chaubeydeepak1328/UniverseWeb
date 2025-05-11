

import React from 'react';
import { LuUserRound } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import universeLogo from "../assets/images/universeLogo.png";

export default function Activate() {
  return (
    <div className='flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20'
      style={{
        background: "linear-gradient(180deg, #000000, #25752D)",
        minHeight: "100vh"
      }}
    >
      <div className='flex flex-col justify-start items-center rounded-lg h-auto sm:h-[75vh] max-w-xl w-full m-auto py-10 px-5 sm:px-10' style={{
        background: 'linear-gradient(178deg, rgba(236, 238, 250, 1) 0%, rgba(9, 111, 114, 0.91) 42%)',
      }}>
        <div>
          <Link to='/user-panel-home'>
            <img src={universeLogo} alt="Logo" className='h-[120px] sm:h-[150px] object-contain' />
          </Link>
        </div>
        <div className='text-2xl sm:text-4xl font-bold mt-5 text-white text-center'>
          Slot to be activated :
        </div>
        <div className='text-center text-md sm:text-sm mt-2'> Check your wallet before proceed to payment.</div>

        <Link to='/d-matrix' className='flex justify-center items-center text-white text-lg sm:text-xl font-semibold w-full max-w-xs h-12 rounded-xl text-center my-5 py-2 cursor-pointer hover:bg-blue-600 transition'
          style={{
            background:
              "linear-gradient(262deg, rgba(32, 173, 29, 1) 0%, rgba(239, 185, 10, 1) 50%)",
          }}
        >
          <div>Activate</div>
        </Link>


        <div className='mt-10 sm:mt-20 flex items-center gap-3 sm:gap-2 mb-2 text-center'>
          {/* <LuUserRound className='text-xl sm:text-2xl' />  */}
          <Link className="text-sm sm:text-lg hover:text-blue-500">&gt;&gt;&gt;&gt; Viewing of Your Account &lt;&lt;&lt;&lt;</Link>

        </div>

        <div className="text-white text-sm sm:text-lg cursor-pointer hover:underline flex gap-2">
          <LuUserRound className="text-xl sm:text-2xl" />
          Check in Ramestta Smart Chain
        </div>
      </div>
      <div className='text-center mb-5 text-sm sm:text-base'>
        Telegram channel: @xyz
      </div>
    </div>
  );
}
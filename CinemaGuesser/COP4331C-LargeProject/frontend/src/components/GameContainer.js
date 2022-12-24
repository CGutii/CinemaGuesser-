import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function GameContainer()
{
    return(
        <div className='flex justify-center mt-20'>
      
      <div className='flex justify-center items-start w-1/2'>
        
        <div className='flex flex-row w-full justify-center items-center rounded-md bg-slate-500 bg-opacity-10 backdrop-blur-sm'>
          <div className='flex flex-col border basis-2/5'>
            <p className=' text-pr-yellow'>Name of Movie</p>
          </div>
          <div className='flex flex-col border basis-3/5 '>
            a
          </div>
        </div>
      </div>
      
    </div>
    )
}
export default GameContainer;
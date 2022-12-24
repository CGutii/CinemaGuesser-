
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PlayBtn } from '../images/PlayBtn.svg';

function HomeContainer()
{
    const navigate = useNavigate();
    return(
        <div className='flex justify-center mt-20'>
            <div className='flex justify-center items-start w-1/2'>
                <button onClick={() => navigate('/game')}>
                    <PlayBtn className = 'mt-10 animate-pulse'/>
                </button>
                
            </div>
            
        </div>
    )
}
export default HomeContainer;
import React from 'react';
import HomeContainer from '../components/HomeContainer';


function HomePage()
{
    return(
        <>
            <div className='flex flex-col justify-center'>
                <div className='flex flex-col justify-center items-start'>
                    <div className='flex flex-col basis-1/2 justify-center items-center w-full'> 
                        <p className='text-center mt-10 text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-white font-bold' >Ready to Play!?</p>
                        <p className='text-center text-sm text-pr-white font-medium mt-5'>Your mission, should you choose to accept it is to Guess the movie rating 1-10.  </p>
                        <p className='text-center text-sm text-pr-white font-medium '>
                        You will be given the description
                        of the movie, the movie poster, cast, and earned money in box office.
                        </p>
                        <p className='text-center text-sm text-pr-white font-medium '>
                        You will have three guesses, and will be rewarded based off how close you were to the rating. Good Luck!
                        </p>
                    </div>
                    
                </div>
                
            </div>
            <HomeContainer/>
        </>
    )

}

export default HomePage;
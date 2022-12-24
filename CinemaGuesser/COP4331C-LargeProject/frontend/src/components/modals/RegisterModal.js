import React, {useState} from "react";


function RegisterModal({open, onClose})
{
    if(!open)
        return null   
    return(
        <div className="fixed w-full h-full inset-0 bg-pr-yellow">
            <div className="fixed flex top-2/4 left-1/2 bg-pr-white translate-y-2/4 translate-x-2/4 w-full z-10">
                <button className="fixed right-5" onClick={onClose}>Exit</button>
                <p>sdonjds</p>
            </div>
            
        </div>
    )
}

export default RegisterModal;
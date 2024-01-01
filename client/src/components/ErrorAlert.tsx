import {FaX} from "react-icons/fa6";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props{
    handleError: Dispatch<SetStateAction<boolean>>;
}

export default function ErroAlert({handleError}: Props){

    const [closing, setclosing] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setclosing(true)
            setTimeout(() => {
                handleError(false)
            },1000)
        },3000)       
    })

    return<>
        {/* ERRORS */}
        <div className={`bottom-0 transition-all z-50 border-[0.1px] border-red-500 right-0 absolute w-96 h-20 bg-red-100 m-5 rounded-lg 
        ${closing && "opacity-0"}`}>
           <div className="flex justify-between bg-red-500 py-2 px-3 font-bold items-center rounded-t-lg text-white">
                <h1>Error</h1>
                <span className="cursor-pointer"><FaX/></span>
            </div> 
            <p className="px-2 py-1">Some error occurred</p>
        </div>
    </>
}
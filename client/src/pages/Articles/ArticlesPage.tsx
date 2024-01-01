import { useState, useEffect, Dispatch, SetStateAction} from "react"
import {useNavigate} from "react-router-dom";
import {FaGear} from "react-icons/fa6";

interface IArticles{
  ar_id  :  number ;
  ar_name : string;
  ar_code  : string;
  ar_brand : string;
  ar_year : string;
  ar_color : string;
  ar_image : string;
}

interface Prop{
    handleArticleSel: Dispatch<SetStateAction<IArticles | undefined>>
}

export default function ArticlesPage({handleArticleSel}: Prop){
    const [Articles,SetArticles] = useState<IArticles[]>();
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch("http://localhost:3000/articles").then((response) => {
            response.json().then((data) => {
                SetArticles(data)
            })
        })
    }, [])

    return<>
        <nav className="p-5">
            <button onClick={() => {
                navigate("/articles/create")
            }} className="bg-blue-500 px-5 py-2 rounded-lg text-white font-bold">Create Article</button>      
        </nav>
        <div className={"flex flex-row flex-wrap gap-3 p-10"}>
            {Articles?.map((x) => <>
                <div onClick={() => {
                    handleArticleSel(x)
                    navigate("/articles/edit")
                }} key={x.ar_code} className="border cursor-pointer !w-56 rounded-lg ">
                    <div className="flex justify-end p-3 px-5">
                        <span className="text-gray-400 opacity-15 hover:opacity-100 transition-all">
                            <FaGear/>
                        </span>
                    </div>
                    <div className="px-10 pt-10 pb-2 flex-col flex items-center">
                        <img className="w-32 h-32 mx-auto" src={x.ar_image}/>  
                        <p className="text-ellipsis text-nowrap">{x.ar_brand}</p>          
                        <p className="text-ellipsis text-nowrap">{x.ar_name} - {x.ar_color}</p>
                        <p className="text-ellipsis text-nowrap">{x.ar_year}</p>
                    </div>
                    <div className="p-2 flex justify-center items-center bg-sky-500 text-white rounded-b-lg">
                       <h1 className="font-bold text-lg">{x.ar_code}</h1>
                    </div>
                </div>
            </>)}
        </div>
    </>
}
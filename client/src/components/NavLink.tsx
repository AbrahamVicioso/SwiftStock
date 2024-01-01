import {useLocation, useNavigate} from "react-router-dom";

interface Props{
    Path: string,
    Icon: string,
    Name: string
}

export default function NavLink({Path,Icon,Name}: Props){
    const navigate = useNavigate();
    const location = useLocation();

    return<>
        <div onClick={() => {navigate(Path)}} className={`py-1 flex cursor-pointer gap-3 transition-all
        hover:text-sky-500 justify-end pr-10 
          items-center ${Path == location.pathname && "text-sky-600 border-sky-600 border-l-2 ml-5 font-bold"}`}>
              <Icon/>
              <a>{Name}</a>
          </div>
    </>
}
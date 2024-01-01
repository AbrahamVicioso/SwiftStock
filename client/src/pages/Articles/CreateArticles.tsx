import {FaFloppyDisk,FaDoorOpen} from "react-icons/fa6";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";
import ErroAlert from "../../components/ErrorAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css"
import IArticles from "../../Models/IArticles";

export default function CreateArticles(){

    const [startDate,SetstartDate] = useState<Date>(new Date());
    const {register,handleSubmit, formState: {errors}} = useForm<IArticles>();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const [preview,setPreview] = useState<string>();
    const [Error,SetError] = useState<boolean>(false);


    const onSubmit = async (data: IArticles)  => {
        setLoading(true)
        const formdata = new FormData();
        formdata.append("ar_brand",data.ar_brand);
        formdata.append("ar_name",data.ar_name);
        formdata.append("ar_color",data.ar_color);
        formdata.append("ar_year",startDate.getFullYear().toString());
        formdata.append("ar_image",data.ar_image[0]);

        await fetch("http://localhost:3000/articles/add",{
            method: "POST",
            mode: "cors",
            body: formdata
        }).then((response) => {
            if(response.status == 201){                
                setLoading(false)
                navigate("/articles")
            }else{
                console.log("Error")
                SetError(true)
                setLoading(false)
            }
        })
    }

    return<>
        {Error && <ErroAlert handleError={SetError}/>}

        <form className={`transition-all ${loading && "opacity-10"}`} onSubmit={handleSubmit(onSubmit)}>
            <nav className="px-5 py-2 border-b-[0.5px]">
                <h1 className="font-bold text-gray-500">New Article</h1>
            </nav>
            <div className="flex gap-3 p-5">
                <button onClick={handleSubmit(onSubmit)} className="bg-blue-500 transition-all hover:bg-blue-400 w-32 px-5 py-2 rounded-lg text-white font-semibold flex justify-center items-center gap-3"> <FaFloppyDisk/>Save</button> 
                <button onClick={() => navigate("/articles")} className="bg-orange-400 transition-all hover:bg-orange-300 w-32 px-5 py-2 rounded-lg text-white font-semibold flex justify-center items-center gap-3"> <FaDoorOpen/>Exit</button> 
            </div>

            <div className="grid grid-cols-3 col-span-5 gap-5">
                <div className="px-10">
                    <h1>Model Name</h1>
                    <input {...register("ar_name", {required: true})} className="outline-none mt-1 w-full px-5 py-2 border-[0.5px] rounded-lg" placeholder="Model Name"/>
                    {errors.ar_name?.type === 'required' && <p className="text-red-600 m-1">This field is required</p>}
                </div>

                <div className="px-10">
                    <h1>Brand Name</h1>
                    <input  {...register("ar_brand" , {required: true})} className="outline-none mt-1 w-full px-5 py-2 border-[0.5px] rounded-lg" placeholder="Brand Name"/>
                    {errors.ar_brand?.type === 'required' && <p className="text-red-600 m-1">This field is required</p>}
                </div>

                <div className="px-10">
                    <h1>Color</h1>
                    <input  {...register("ar_color" , {required: true})} className="outline-none mt-1 w-full px-5 py-2 border-[0.5px] rounded-lg" placeholder="Color"/>
                    {errors.ar_color?.type === 'required' && <p className="text-red-600 m-1">This field is required</p>}
                </div>

                <div className="px-10">
                    <h1>Year</h1>
                    <DatePicker  {...register("ar_year" ,{required: false})} className="text-black border-[0.5px] px-5 py-2"
                        selected={startDate}
                        dateFormat={"yyyy"}
                        showYearPicker
                        onChange={(date: Date) => {
                            SetstartDate(date)
                        }}
                    />
                    {errors.ar_year?.type === 'required' && <p className="text-red-600 m-1">This field is required</p>}
                </div>

                <div className="px-10 flex flex-col items-center transition-all">
                    <h1 className="w-full">Imagen</h1>
                    {preview && <img src={preview}  id="preview_img" className="w-40 h-40 transition-all"/>}
                    <input  type="file" {...register("ar_image", {required: true})} className="outline-none w-full mt-1 px-5 py-2 border-[0.5px] rounded-lg" placeholder="Color"
                        onChange={(e) => {
                            if(e.target.files){
                                const file : FileList = e.target.files;
                                setPreview(URL.createObjectURL(file[0]));
                            }
                        }}
                    />
                    {errors.ar_image?.type === 'required' && <p className="w-full text-red-600 m-1">This field is required</p>}
                </div>

            </div>
        </form>
    </>
}
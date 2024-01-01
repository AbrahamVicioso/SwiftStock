// import { useState, useEffect } from "react";
import {Routes,Route} from "react-router-dom";
import ArticlesPage from "./pages/Articles/ArticlesPage";
import {FaHouseChimney,FaFile, FaWarehouse} from "react-icons/fa6";
import CreateArticles from "./pages/Articles/CreateArticles";
import EditArticle from "./pages/Articles/EditArticle";
import NavLink from "./components/NavLink";
import { useState } from "react";
import IArticles from "./Models/IArticles";

export default function App(){
  const [ArticleSel, SetArticleSel] = useState<IArticles>();

  return<>
    <div className="flex">
      
      {/* Nav page */}
      <div className="!w-[270px] flex flex-col min-h-screen h-full gap-3 py-10 text-gray-500 text-lg border-r-[0.5px] rounded-r-lg">
          <a href="/" className="text-2xl font-bold text-center mb-10">SwiftStock</a>

          <NavLink Icon={FaHouseChimney} Name={"Home"} Path={"/"}/>

          <NavLink Icon={FaFile} Name={"Articles"} Path={"/articles"}/>

          <NavLink Icon={FaWarehouse} Name={"Warehouses"} Path={"/warehouses"}/>
      </div> 

      {/* MAIN */}
        <div className="w-full overflow-y-auto min-h-screen sticky">
          <Routes>
            <Route path="/" element={<>Hola</>}/>
            <Route path="/articles" element={<ArticlesPage handleArticleSel={SetArticleSel}/>}/>
            <Route path="/articles/create" element={<CreateArticles/>}/>
            {ArticleSel && <Route path="/articles/edit" element={<EditArticle ArticleSel={ArticleSel}/>}/>}
          </Routes>
        </div>
    </div>
  </>
}
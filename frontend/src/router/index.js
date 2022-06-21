import React from "react";
import { Route, Routes} from 'react-router-dom';

import Home from "../pages/Home/Home";
import Page404 from "../pages/Page404/Page404";
import Cadastro from "../pages/Cadastro/Cadastro";


export default function Router(){
    return(
            <Routes>
                <Route path='*' element={< Page404 />}/>
                <Route path='/' element={< Home />}/>
                <Route path='/cadastro' element={< Cadastro />}/>

            </Routes>
    );
}
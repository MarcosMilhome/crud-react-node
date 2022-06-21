import React from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Header.css';

export default function Header(){
    return(
        <div className="navbar">
            <Link  to="/">
                Home
            </Link>
            <Link  to="/cadastro">
                Cadastro
            </Link>

        </div>
    );
}

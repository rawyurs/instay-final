import React, { useState } from "react";

import logotipo from "../assets/logotipo.png";


const Navbar = () => {

    // adicionar background ao header

    const [transparent, setTransparent] = useState('header')
    const addBg = () => {
        if (window.scrollY >= 10) {
            setTransparent('header activeHeader')
        } else {
            setTransparent('header')
        }
    }
    window.addEventListener('scroll', addBg)

    return (
        <section className="navBarSection">
            <div className={transparent}>
                <div className="logoDiv">
                    <a href="#" className="logo">
                        <h3 className="flex"><img className="logotipo icon" src={logotipo}></img>inStay</h3>

                    </a>
                </div>
            </div>
        </section>
    )
}

export default Navbar;

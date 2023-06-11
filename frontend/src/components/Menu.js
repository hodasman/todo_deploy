import React from "react"
// import UserList from "./User";

function NavbarItem({name, href}) {
    return (
        <li>
            <a href={href}>{name}</a>
        </li>
    )
}

export default function Navbar({navbarItems}) {
    return (
        <div>
            {navbarItems.map((item) => <NavbarItem name={item.name} href={item.href}/>)}
        </div>

    )
}
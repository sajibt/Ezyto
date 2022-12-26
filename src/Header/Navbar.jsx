import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import useAuthContext from "../Hooks/useAuthContext";
import useLogout from "../Hooks/useLogout";
import "./Navbar.scss";
import { ImCross } from "react-icons/im";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import useNotesContext from "../Hooks/useNotesContext";

const Navbar = () => {
  const { logout } = useLogout();

  const { user } = useAuthContext();
  console.log(user);
  const { notes } = useNotesContext();
  const name = notes.data.map((item) => {
    return item.author.map((item) => {
      return item.username;
    });
  });
  console.log(name[0], "fucking name");
  const { mode } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [burger, setBurger] = useState(false);

  function handleBurger() {
    setBurger((prev) => !prev);
  }
  function handleOpen() {
    setOpen((open) => !open);
  }

  function handleClick() {
    logout();
  }

  return (
    <header>
      <div className="nav_container">
        <Link to="/">
          <h1 className="logo">Ezyto</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <button onClick={handleOpen} className="menuToggle">
                <span onClick={handleBurger}>
                  {burger ? <ImCross /> : <HiOutlineMenuAlt3 />}
                </span>
              </button>
              <div className="right-nav">
                <ul className={open ? "open" : "menu "}>
                  <li onClick={burger}>
                    <Link to="/">Home</Link>
                  </li>
                  <li onClick={burger}>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <span>{name[0]}</span>
                  </li>
                  <li>
                    <button className="right-nav__btn" onClick={handleClick}>
                      Logout
                    </button>
                  </li>
                  {/* <span> {user.email}</span> */}
                </ul>
              </div>
            </div>
          )}
          {!user && (
            <div className="middlen hidem">
              <div className="middle-nav">
                <Link className="navbtn" to="/login">
                  {" "}
                  Login
                </Link>
                <Link className="navbtn" to="/signup">
                  {" "}
                  Signup
                </Link>
              </div>
            </div>
          )}
        </nav>
        <div className="toggleDark" onClick={mode}>
          <svg
            className="moon"
            fill="white"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <defs></defs>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>{" "}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

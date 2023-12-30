import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import "./Navbar.css"
function Navbar({showSearch=true}:{showSearch?:boolean}) {
    // State to manage the dropdown visibility
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
  
  return (
    <>
    <div className="navbar sticky z-[100] top-0 flex justify-between items-center ps-10 pe-10 pt-3 w-full h-[10vh] " >
      <div className="logo font-bold text-white">
        Logo
      </div>
      {showSearch && <div className="search-container flex items-center justify-between w-[35vw] h-[76%] text-white bg-transparend rounded-full ps-2 pe-2 border-[1.5px] border-white border-solid">
        <input type="text" className="w-[90%] h-full bg-transparent outline-none text-[2.5vh]" placeholder="Search..."/>
        <IoSearch />

      </div>}
      <div className="account-icon" onClick={toggleDropdown}>
      <IoPersonSharp className="text-white text-[3.7vh]" />
      {/* Dropdown */}
      {isDropdownOpen && (
            <div className="dropdown absolute  right-5 mt-2 bg-white text-black rounded-md shadow-lg overflow-hidden border-white border-[1px] rounded-full border-solid">
              {/* Dropdown content */}
              <div className="p-2 text-white ">Profile</div>
              <div className="p-2 text-white">Settings</div>
              <div className="p-2 text-white">Logout</div>
            </div>
          )}
      </div>
    </div>
    </>
  );
}

export { Navbar };

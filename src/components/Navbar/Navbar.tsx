import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import "./Navbar.css"
import { GiSofa } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useUserAuthStore, useVideoStore } from "../../store/store";

function Navbar({showSearch=true}:{showSearch?:boolean}) {
    // State to manage the dropdown visibility
    const{getVideo}=useVideoStore()
    const [userPresent, setuserPresent] = useState<number|null>(null);

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const navigate=useNavigate()
    // Function to toggle the dropdown
    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };

    const handleSearch = (searchText: string) => {
      // Handle your search logic here
      // For example, you can navigate to a search results page
      // navigate(`/search?q=${searchText}`);
      getVideo({type:"search",value:searchText})
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Check if the Enter key is pressed (key code 13)
      if (e.key === "Enter") {
        // Handle search with the entered text
        handleSearch((e.target as HTMLInputElement).value);
      }
    };  
    const {user,logout} =useUserAuthStore()
    useEffect(()=>{
      setuserPresent(user.userId)
    },[user])

    return (
    <>
    <div className="navbar sticky z-[100] top-0 flex justify-between items-center ps-5 pe-5 pt-3 w-full h-[10vh] " >
      <div onClick={()=>{navigate('/')}} className="logo cursor-pointer font-bold text-white flex items-center gap-2">
      <GiSofa className="text-xl" />
        SitcomStore
      </div>
      {showSearch && <div className="search-container flex items-center justify-between w-[35vw] h-[76%] text-white bg-transparend rounded-full ps-2 pe-2 border-[1.5px] border-white border-solid">
        <input type="text"  onKeyDown={handleKeyDown} className="search-box w-[90%] h-full bg-transparent outline-none text-[2.5vh]" placeholder="Search..."/>
        <IoSearch className="search-box"/>

      </div>}
      <div className="account-icon" onClick={toggleDropdown}>
      <IoPersonSharp className="text-white text-[3.7vh]" />
      {/* Dropdown */}
      {isDropdownOpen && (
            <div className="dropdown absolute  right-5 mt-2 bg-[#1f2028] text-black rounded-md shadow-lg overflow-hidden border-white border-[1px] rounded-full border-solid">
              {/* Dropdown content */}
              {!  userPresent?<><div onClick={()=>{navigate('/login')}} className="p-2 text-white ">Login</div>
              <div onClick={()=>{navigate('/signup')}} className="p-2 text-white">Signup</div>
              </>:
              <div onClick={()=>{logout()}} className="p-2 text-white">Logout</div>}
              {/* <div className="p-2 text-white">Logout</div> */}
            </div>
          )}
      </div>
    </div>
    </>
  );
}

export { Navbar };

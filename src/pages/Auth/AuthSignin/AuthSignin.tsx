import { IoPerson } from "react-icons/io5";
import { Navbar } from "../../../components/components";
import { FaKey, FaRegEye } from "react-icons/fa";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuthStore } from "../../../store/Authstore";

function AuthSignin() {
    const navigate=useNavigate()
    const {signup}=useUserAuthStore()
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault()
    if (
        formData.firstname.trim() === "" ||
        formData.lastname.trim() === "" ||
        formData.email.trim() === "" ||
        formData.password.trim() === ""
      ) {
        toast.error("All fields are required!");}
    // Handle the form submission here, you can use formData to send the data to your backend or perform other actions
        signup(formData)
      setFormData({
        firstname:"",
        lastname: "",
        email: "",
        password: "",
      })
    
  };

  return (
    <>
      <Navbar showSearch={false} />
      <div className="main-content flex w-full max-w-[100vw] ">
        <div className="content-wrapper flex flex-nowrap w-full items-center justify-center mt-10">
          <form
            className="login-box flex flex-col gap-2 ps-2 pe-2 items-center h-[20rem] w-[20rem] bg-transparent"
            onSubmit={handleSubmit}
          >
            <div className="login-box-title text-white font-bold text-xl">
              Signup
            </div>
            <div className="login-box-input w-full rounded-[10px] mt-3 flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[2.4rem]  overflow-hidden border-[2px] border-solid border-[#04478a]">
              <IoPerson className="text-white text-xl" />
              <input
              required
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="text-white text-[1rem] bg-transparent outline-none border-none h-full w-[95%]"
              />
            </div>
            <div className="login-box-input w-full rounded-[10px]  flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[2.4rem]  overflow-hidden border-[2px] border-solid border-[#04478a]">
              <IoPerson className="text-white text-xl" />
              <input
              required
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="text-white text-[1rem] bg-transparent outline-none border-none h-full w-[95%]"
              />
            </div>
            <div className="login-box-input w-full rounded-[10px]  flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[2.4rem]  overflow-hidden border-[2px] border-solid border-[#04478a]">
              <IoPerson className="text-white text-xl" />
              <input
              required
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="text-white text-[1rem] bg-transparent outline-none border-none h-full w-[95%]"
              />
            </div>
            <div className="login-box-input w-full rounded-[10px] flex gap-3 items-center ps-2 pe-2 pt-[2px] pb-[1px] h-[2.4rem]  overflow-hidden border-[2px] border-solid border-[#04478a]">
              <FaKey className="text-white text-l" />
              <input
              required
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="text-white text-[1rem] bg-transparent outline-none border-none h-full w-[90%]"
              />
              <FaRegEye
                onClick={() => {
                  setPasswordShown(!passwordShown);
                }}
                className="cursor-pointer text-white text-l"
              />
            </div>
            <button type='submit' className="login-box-button w-full h-[2rem] rounded-[10px] bg-[#05386b] mt-2 text-white flex justify-center items-center text-[1rem] font-semibold" onClick={handleSubmit}>
              Signup
            </button>
            <div onClick={()=>{navigate('/login')}} className="create-link text-white text-xs font-semibold mt-3">
              Already have an Account?
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export { AuthSignin };

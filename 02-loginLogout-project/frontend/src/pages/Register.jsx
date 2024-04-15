import { useState } from "react";
import axios from "axios"
import {toast} from "react-hot-toast"
import  { useNavigate } from "react-router-dom"


function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const registerUser = async(e) => {
    e.preventDefault();
    // console.log(data);
    
    
    const {name,email,password} = data;
    try {
      const {data} = await axios.post("/register",{
        name,email,password
      })
      if(data.error){
        toast.error(data.error)
      } else{ 
        setData({
          name: "",
          email: "",
         password: "",
        })
        toast.success("User Created SuccessFully !!")
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error)
    }

  };

  return (
    <>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <form
          onSubmit={registerUser}
          className="flex justify-center items-center border border-black w-[50%] h-[70%] flex-col bg-slate-600 text-white font-bold text-2xl"
        >
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Your Name..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="text-black font-bold"
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="text-black font-bold"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="text-black font-bold"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;

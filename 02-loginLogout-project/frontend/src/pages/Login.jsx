import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", { email, password });
      setData({
        email: "",
        password: "",
      });
      navigate("/");
      // console.log(data);
      toast.success(data.message);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <form
          onSubmit={loginUser}
          className="flex justify-center items-center border border-black w-[50%] h-[70%] flex-col bg-slate-600 text-white font-bold text-2xl"
        >
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Your Email..."
            className="text-black font-bold"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password..."
            className="text-black font-bold"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Login;

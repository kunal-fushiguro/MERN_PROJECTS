import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [input, setinput] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    const url = "http://localhost:8000/api/v1/login";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then(async (res) => await res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("id", res.id);
        if (res.value) {
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setinput({ username: "", password: "" });
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-row justify-center items-center bg-[#0D121C]">
        <div className="w-[30%] h-[70%] border-white border-[1px] rounded-lg flex flex-col justify-center items-center gap-2 font-bold text-white">
          <h2 className="h-[10%] w-full text-center text-[35px] flex justify-center items-center">
            Login
          </h2>
          <div className="h-[80%] w-full text-center text-[25px] ">
            <div className="w-full h-[30%]  flex flex-col justify-center items-center pl-3">
              <h2 className="w-full text-[20px] text-start pl-12">User name</h2>
              <input
                type="text"
                className="w-[90%] h-[40%] rounded-3xl pl-4 outline-none border-white border-[1px] text-[15px] bg-[#0D121C]"
                value={input.username}
                onChange={(e) =>
                  setinput({ ...input, username: e.target.value })
                }
              />
            </div>

            <div className="w-full h-[30%]  flex flex-col justify-center items-center pl-3">
              <h2 className="w-full text-[20px] text-start pl-12">Password</h2>
              <input
                type="text"
                className="w-[90%] h-[40%] rounded-3xl pl-4 outline-none border-white border-[1px] text-[15px] bg-[#0D121C]"
                value={input.password}
                onChange={(e) =>
                  setinput({ ...input, password: e.target.value })
                }
              />
            </div>
            <button
              className="w-[30%] h-[10%] bg-blue-800 text-[15px] rounded-2xl"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <h2 className="h-[10%] w-full text-center text-[15px]  flex flex-row justify-center items-center gap-4">
            Don't have An Account
            <Link to={"/register"} className="text-blue-400">
              Register here
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
}

export default Login;

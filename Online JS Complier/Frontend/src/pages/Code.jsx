import { useState, useEffect } from "react";
import { IoLogoJavascript } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Code() {
  const [profile, setProfile] = useState(false);
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (localStorage.getItem("code")) {
      const saveData = localStorage.getItem("code");
      setCode(saveData);
    }
    console.log();
    async function checkingUser() {
      const id = await localStorage.getItem("id");
      if (id) {
        const url = "http://localhost:8000/api/v1/getcode";
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then(async (res) => await res.json())
          .then((res) => {
            console.log(res);
            if (res.value) {
              setProfile(true);
              setUser(`${res.username}`);
              localStorage.setItem("code", res.code);
              setCode(localStorage.getItem("code"));
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
      return;
    }

    checkingUser();
  }, []);

  const handleLocallySave = async () => {
    localStorage.setItem("code", code);
  };

  const handleCode = async () => {
    const url = "http://localhost:8000/api/v1/run";
    console.log(code);
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
    })
      .then(async (res) => await res.json())
      .then((res) => {
        console.log(res);
        if (res.output) {
          setOutput(res.output);
        }

        if (res.error) {
          setOutput(res.error);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //
  const navigate = useNavigate();
  const saveOnline = async () => {
    const saveCodeOnline = code;
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/login");
    }
    const url = "http://localhost:8000/api/v1/save";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, code: saveCodeOnline }),
    })
      .then(async (res) => await res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#31363F] font-bold text-white">
        <div className="lg:h-[10%] h-[10%] w-full flex flex-row justify-around items-center gap-4 lg:pl-4">
          <IoLogoJavascript color="#5BAB47" className="text-[60px] font-bold" />
          <h2 className="text-[30px]">Online Javascript Complier</h2>
          <Link to={"/login"}>
            {profile ? (
              <button className="bg-[#5BAB47] w-[95px] text-[#31363F] text-[20px] font-bold rounded-md h-[50px]">
                {user}
              </button>
            ) : (
              <button className="bg-[#5BAB47] w-[75px] text-[#31363F] text-[20px] font-bold rounded-md h-[50px]">
                <Link to={"/login"}>Login</Link>
              </button>
            )}
          </Link>
        </div>
        <div className="lg:h-[90%] w-full flex justify-center items-center flex-row">
          <div className="h-full w-[50%] flex flex-col justify-center items-center">
            <div className="h-[10%] w-full flex flex-row justify-start items-center gap-8 pl-8 border-white border-b-[1px] border-t-[1px]">
              <button
                className="bg-[#5BAB47] w-[75px] text-[#31363F] text-[20px] font-bold rounded-md h-[50px]"
                onClick={handleCode}
              >
                Run
              </button>
              <button
                className="bg-[#5BAB47] w-[150px] text-[#31363F] text-[20px] font-bold rounded-md h-[50px]"
                onClick={handleLocallySave}
              >
                Save Locally
              </button>
              <button
                className="bg-[#5BAB47] w-[150px] text-[#31363F] text-[20px] font-bold rounded-md h-[50px]"
                onClick={saveOnline}
              >
                Save Online
              </button>
            </div>
            <div className="h-[90%] w-full">
              <textarea
                name="code"
                id="code"
                className="w-full h-[99%] overflow-y-scroll pl-4 text-[20px] outline-none bg-[#31363F] text-wrap"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                draggable="false"
              ></textarea>
            </div>
          </div>
          <div className="h-full border-white border-l-[1px] border-t-[1px] w-[50%]">
            <div className="border-b-[1px] border-white w-full h-[5%] flex justify-center items-center text-[20px]">
              Output
            </div>
            <textarea
              className="text-[20px] pl-4 w-full h-[94%] outline-none bg-[#31363F]"
              readOnly
              value={output}
            ></textarea>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Code;

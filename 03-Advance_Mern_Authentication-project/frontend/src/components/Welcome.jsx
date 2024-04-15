import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

function Welcome() {
  const [data, setData] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5555/api/user", {
        withCredentials: true,
      })
      .then((res) => console.log(res))
      .catch((e) => {
        console.log(e);
      });
    console.log(res);
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest()
      .then((data) => setData(data.user))
      .catch((e) => console.log(e));
  }, []);
  return <div>{data && <h1>{data.name}</h1>}</div>;
}

export default Welcome;

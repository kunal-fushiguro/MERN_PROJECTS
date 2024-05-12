import { Route, Routes } from "react-router-dom";
import Code from "./pages/Code";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Code} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  );
}

export default App;

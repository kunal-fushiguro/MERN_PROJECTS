import {Link} from "react-router-dom"
function Navbar() {
  return (
    <>
      <nav className="w-full flex justify-around items-center h-[40px] bg-slate-600 text-white font-bold text-2xl">
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
    </>
  )
}

export default Navbar
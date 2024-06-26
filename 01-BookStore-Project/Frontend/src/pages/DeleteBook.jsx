import { useState } from "react";
import Backbutton from "../components/Backbutton.jsx";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <>
      <div className="p-4">
        <Backbutton />
        <h1 className="text-3xl my-4">Delete Book</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col items-center border border-sky-800 rounded-xl w-[600px] p-8 mx-auto">
          <h3 className="text-2xl">
            Are You Sure You Want To Delete This Book
          </h3>
          <button
            className="p-4 bg-red-600 text-white m-8 w-full "
            onClick={handleDeleteBook}
          >
            Yes , Delete It
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteBook;

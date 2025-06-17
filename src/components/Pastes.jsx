import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { MdOutlineModeEdit, MdDelete, MdContentCopy } from "react-icons/md";

import { removeFromPaste, resetAllPaste } from "../features/pasteSlice";

import { GrView } from "react-icons/gr";
import { toast } from "react-toastify";
const Pastes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(pastes);
  // console.log(filterData);

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  function handleViewPaste(pasteId) {
    nevigate(`/pastes/${pasteId}`);
  }

  return (
    <div className="mt-30 select-none">
      <input
        className="border rounded border-gray-500 w-[90%] md:w-[800px] m-auto p-2 mt-12 block"
        placeholder="Search Paste"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
      />

      <div className="flex flex-col gap-5 mt-10 w-[90%] md:w-[800px] m-auto">
        {filterData.length > 0 ? (
          filterData.map((paste) => {
            return (
              <div
                key={paste.id}
                className="border border-gray-500 p-3 rounded-lg bg-gray-800  "
              >
                <div className="flex justify-between items-start">
                  <h1 className="text-lg md:text-2xl mb-4 ">{paste.title}</h1>
                  <div className="flex flex-row p-2 justify-end text-right  gap-3">
                    <button
                      title={"Edit"}
                      className="border border-gray-600 text-xs md:text-lg p-1 rounded cursor-pointer hover:bg-gray-700"
                    >
                      <Link to={`/?pasteId=${paste.id}`}>
                        <MdOutlineModeEdit />
                      </Link>
                    </button>
                    <button
                      title={"View"}
                      onClick={() => handleViewPaste(paste?.id)}
                      className="border-gray-600 border text-xs md:text-lg p-1 rounded cursor-pointer hover:bg-gray-700"
                    >
                      <GrView />
                    </button>
                    <button
                      title={"Delete"}
                      onClick={() => handleDelete(paste.id)}
                      className="border border-gray-600 text-xs md:text-lg p-1 rounded cursor-pointer hover:bg-gray-700"
                    >
                      <MdDelete />
                    </button>

                    <button
                      title={"Copy"}
                      onClick={() => (
                        navigator.clipboard.writeText(paste.content),
                        toast.success("Copied to clipboard", { theme: "dark" })
                      )}
                      className="border border-gray-600 text-xs md:text-lg p-1 rounded cursor-pointer hover:bg-gray-700"
                    >
                      <MdContentCopy />
                    </button>
                  </div>
                </div>

                <div>
                  <p className="md:text-base text-xs">
                    {}{" "}
                    {paste.content.length > 200
                      ? paste.content.slice(0, 200) + "...."
                      : paste.content}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className=" md:text-5xl text-center text-3xl text-blue-400 ">
            No Paste
          </h1>
        )}
        <div className="text-center my-6">
          {filterData.length > 0 ? (
            <button
              onClick={() => dispatch(resetAllPaste())}
              className=" rounded p-2 mr-auto cursor-pointer bg-red-600 text-gray-200 font-semibold shadow-2xs"
            >
              Remove All Paste
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Pastes;

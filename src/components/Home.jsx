import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPaste } from "../features/pasteSlice";
import { toast } from "react-toastify";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const pasteId = searchParam.get("pasteId");
  const dispatch = useDispatch();

  const paste = useSelector((state) => state.paste.pastes);

  // console.log(selectedPaste);

  function createPaste() {
    const paste = {
      title: title.trim() || "Untitled",
      content: value.trim(),
      id: pasteId || Date.now().toString(),
      createAt: new Date().toUTCString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPaste(paste));
    } else {
      //create
      if (value === "")
        return toast.warning("Empty Paste can't saved!", { theme: "dark" });
      dispatch(addToPastes(paste));
    }

    //create or updattion
    setTitle("");
    setValue("");
    setSearchParam({});
  }



  useEffect(() => {
    if (pasteId) {
      const selectedPaste = paste.filter((paste) => paste.id === pasteId);
      setTitle(selectedPaste[0].title);
      setValue(selectedPaste[0].content);
    }
  }, [pasteId]);

  return (
    <>
      <div className="flex flex-row items-center justify-between w-[90%] md:w-[1000px] mb-10 mt-30 m-auto">
        <input
          className="border p-3 rounded-md outline-none w-[65%] md:w-[87%] bg-gray-800"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="p-3 border-none bg-blue-600 rounded-md cursor-pointer"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
      <div className="w-[90%] m-auto md:w-[1000px] ">
        <textarea
          className="border rounded-md p-3 w-full outline-none  bg-gray-800 "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        ></textarea>
      </div>
    </>
  );
};

export default Home;

import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdOutlineModeEdit, MdDelete, MdContentCopy } from "react-icons/md";

const ViewPaste = () => {
  const { id } = useParams();
  // console.log(id);
  const paste = useSelector((state) => state.paste.pastes);
  const selectedPaste = paste.filter((paste) => paste.id === id);

  // console.log(selectedPaste[0].createAt);

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  return (
    <div className=" w-[90%] md:w-[1000px] m-auto mt-20">
      <div>
        <div className=" mb-3 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl border-b py-2 inline-block text-blue-400">
            {selectedPaste[0].title}
          </h1>
          <span>
            <button
              onClick={() => (
                navigator.clipboard.writeText(paste.content),
                toast.success("Copied to clipboard", { theme: "dark" })
              )}
              className=" text-xl p-1 rounded cursor-pointer"
            >
              <MdContentCopy />
            </button>
          </span>
        </div>
        <p className="text-xs mb-7">{selectedPaste[0].createAt}</p>

        <p className="text-base text-justify">{selectedPaste[0].content}</p>
      </div>
      <hr  className="mt-10"/>
      <div className="flex justify-end my-5 gap-6">
        <button
          title={"Delete"}
          onClick={() => handleDelete(paste.id)}
          className="border border-gray-600 text-xl md:text-2xl p-1 rounded cursor-pointer hover:bg-red-700"
        >
          <MdDelete />
        </button>
        <button
          title={"Edit"}
          className="border border-gray-600 text-xl md:text-2xl p-1 rounded cursor-pointer hover:bg-green-700"
        >
          <Link to={`/?pasteId=${paste.id}`}>
            <MdOutlineModeEdit />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const addPaste = () =>
  toast.success("Paste Add Succesfully !", { theme: "dark", autoClose: 3000 });
const deletePaste = () =>
  toast.warning("Paste Deleted !", { theme: "dark", autoClose: 3000 });
const updatePaste = () =>
  toast.success("Paste Updated Succesfully !", { theme: "dark", autoClose: 3000 });

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.unshift(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      addPaste();
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.id === paste.id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        updatePaste();
      }
    },

    resetAllPaste: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.warning("All Pastes Are Deleted !" , {theme: "dark"})
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item) => item.id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        deletePaste();
      }
    },
  },
});

export const { addToPastes, removeFromPaste, updateToPaste, resetAllPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;

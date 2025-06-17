import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-gray-800 fixed w-full top-0 left-0 select-none">
      <div className="flex items-center justify-between w-[90%] m-auto md:w-[1000px]  md:gap-20 p-3">
        <div className="text-3xl font-semibold  md:text-4xl">
          <NavLink to={"/"}>PasteIT</NavLink>
        </div>

        <div className="flex gap-7 md:text-xl">
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-2 text-blue-600" : null
            }
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-2 text-blue-600" : null
            }
            to={"/pastes"}
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

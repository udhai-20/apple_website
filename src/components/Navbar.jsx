import React from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constent/constent";

const Navbar = () => {
  return (
    <header className="w-full flex justify-center items-center py-5 px-3 sm">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="appleImg" width={14} height={14} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => (
            <div
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="searchImg" width={14} height={14} />
          <img src={bagImg} alt="bagImg" width={14} height={14} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

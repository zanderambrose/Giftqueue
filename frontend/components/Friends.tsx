import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Friends = () => {
  return (
    <div className="relative top-10 px-8">
      <h1 className="text-lg relative right-2">Friends List</h1>
      <label className="relative block mt-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <FontAwesomeIcon
            className="relative left-1"
            size="lg"
            style={{ color: "#aa96da" }}
            icon={faSearch}
          />
        </span>
        <input
          className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-md"
          placeholder="Search for friends"
          type="text"
          name="search"
        />
      </label>
    </div>
  );
};

export default Friends;

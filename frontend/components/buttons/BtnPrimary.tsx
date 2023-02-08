import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IBtnPrimary {
  text: string;
  clickHandler: () => void;
}

const BtnPrimary = ({ text, clickHandler }: IBtnPrimary) => {
  return (
    <div onClick={clickHandler} className="btn-primary hover:opacity-80">
      <FontAwesomeIcon className="text-white mr-2" icon={faPlus} />
      <button className="text-white">{text}</button>
    </div>
  );
};

export default BtnPrimary;

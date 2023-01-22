import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BtnPrimary = ({ text }: { text: string }) => {
  return (
    <div>
      <FontAwesomeIcon icon={faPlus} />
      <button>{text}</button>
    </div>
  );
};

export default BtnPrimary;

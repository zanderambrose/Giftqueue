import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BtnPrimary = ({
  text,
  setIsModalOpen,
}: {
  text: string;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => {
        setIsModalOpen && setIsModalOpen(true);
      }}
      className="btn-primary hover:opacity-80"
    >
      <FontAwesomeIcon className="text-white mr-2" icon={faPlus} />
      <button className="text-white">{text}</button>
    </div>
  );
};

export default BtnPrimary;

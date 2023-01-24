import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import BtnPrimary from "./buttons/BtnPrimary";

const CelebrationDay = () => {
  const [hasEvents, setHasEvents] = useState<boolean>(false);
  return (
    <div>
      <FontAwesomeIcon icon={faChampagneGlasses} />
      <h1>No celebration days entered yet.</h1>
      <p>Share your lovely moments with your friends.</p>
      <BtnPrimary text="Add New Event" />
    </div>
  );
};

export default CelebrationDay;

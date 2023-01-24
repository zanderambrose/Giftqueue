import { faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NoItemDefaultCard from "./NoItemDefaultCard";

const CelebrationDay = () => {
  const [hasEvents, setHasEvents] = useState<boolean>(false);
  return (
    <>
      {!hasEvents ? (
        <NoItemDefaultCard
          icon={faChampagneGlasses}
          headingText="No celebration days entered yet!"
          subText="Share your lovely moments with your friends!"
        />
      ) : (
        <h2>you got elements</h2>
      )}
    </>
  );
};

export default CelebrationDay;

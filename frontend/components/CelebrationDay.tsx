import { faChampagneGlasses, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoItemDefaultCard from "./NoItemDefaultCard";
import DateCard from "./DateCard";
import MyEventCard from "./MyEventCard";
import { useSetRecoilState } from "recoil";
import { celebrationDayModal } from "../recoil/modal/celebrationDay";
import { useCelebrationApi } from "../util/clientApi";
import { useQuery } from "@tanstack/react-query";

const CelebrationDay = () => {
  const setCelebrationDayModalShow = useSetRecoilState(celebrationDayModal);
  const handleAddNewDayClick = () => {
    setCelebrationDayModalShow((currVal) => {
      return {
        ...currVal,
        isOpen: true,
      };
    });
  };

  const { getCelebrationDays } = useCelebrationApi();
  // State for showing users celebrations or default state
  const { isLoading, error, data } = useQuery({
    queryKey: ["myCelebrations"],
    queryFn: getCelebrationDays,
  });

  return (
    <>
      {!data ? (
        <NoItemDefaultCard
          icon={faChampagneGlasses}
          headingText="No celebration days entered yet!"
          subText="Share your lovely moments with your friends!"
        />
      ) : (
        <div className="relative top-10 px-8">
          <div className="celebration-day-header">
            <h1 className="text-lg relative right-2">This Week</h1>
            <button
              onClick={() => handleAddNewDayClick()}
              className="btn-add-new rounded relative left-2"
            >
              <FontAwesomeIcon className="relative right-2" icon={faPlus} />
              Add New Event
            </button>
          </div>
          {/* TODO - extract this into its own component */}
          <div className="flex flex-row gap-x-4 mt-4">
            <div>
              <DateCard />
            </div>
            <div className="flex-1">
              <MyEventCard />
            </div>
          </div>
          <div className="flex flex-row gap-x-4 mt-4">
            <div>
              <DateCard />
            </div>
            <div className="flex-1">
              <MyEventCard />
            </div>
          </div>
          <div className="flex flex-row gap-x-4 mt-4">
            <div>
              <DateCard />
            </div>
            <div className="flex-1">
              <MyEventCard />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CelebrationDay;

import { faChampagneGlasses, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoItemDefaultCard from "./NoItemDefaultCard";
import { useSetRecoilState } from "recoil";
import { celebrationDayModal } from "../recoil/modal/celebrationDay";
import { useCelebrationApi } from "../util/clientApi";
import { useQuery } from "@tanstack/react-query";
import { CelebrationItem } from "./CelebrationItem";

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

  const { getCelebrations } = useCelebrationApi();
  // State for showing users celebrations or default state
  const { isLoading, error, data } = useQuery({
    queryKey: ["myCelebrations"],
    queryFn: getCelebrations,
  });

  return (
    <>
      {!data || data?.length < 1 ? (
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
              className="btn-add-new rounded relative left-2 hover:opacity-80"
            >
              <FontAwesomeIcon className="relative right-2" icon={faPlus} />
              {window.screen.width > 640 ? "Add New Event" : "Add New"}
            </button>
          </div>
          {/* TODO - extract this into its own component */}
          {data?.map((item) => {
            return <CelebrationItem key={item.id} {...item} />;
          })}
        </div>
      )}
    </>
  );
};

export default CelebrationDay;

import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MyFriends } from "./friendsPage/myFriends";
import { FindFriends } from "./friendsPage/findFriends";
import { InviteFriends } from "./friendsPage/inviteFriends";
import { emailInviteModal } from "../recoil/modal/emailInvite";
import { ModalEmailInvite } from "./modals/ModalEmailInvite";

const Friends = () => {
    const [tabState, setTabState] = useState<"myFriends" | "findFriends">("myFriends")
    const [queryState, setQueryState] = useState("");

    const setEmailInviteModalShow =
        useSetRecoilState(emailInviteModal);

    const handleInviteButtonClick = () => {
        setEmailInviteModalShow((currVal) => {
            return {
                ...currVal,
                isOpen: true,
            };
        });
    };


    const handleSearchInputChange = (e: any) => {
        setQueryState(e.target.value);
    };


    return (
        <>
            <div className="relative top-10 px-8">
                <div role="tablist" className="tabs tabs-lifted tabs-lg">
                    <a onClick={() => setTabState("myFriends")} role="tab" className={`tab ${tabState === "myFriends" ? "tab-active" : ""}`}>My Friends</a>
                    <a onClick={() => setTabState("findFriends")} role="tab" className={`tab ${tabState === "findFriends" ? "tab-active" : ""}`}>Find Friends</a>
                </div>
                <label className="relative block mt-4">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <FontAwesomeIcon
                            className="relative left-1 gqp"
                            size="lg"
                            icon={faSearch}
                        />
                    </span>
                    <input
                        className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-md"
                        placeholder="Search friends"
                        value={queryState}
                        onChange={(e) => handleSearchInputChange(e)}
                        type="text"
                        name="search"
                    />
                </label>
                <InviteFriends friendsQty={10} handleClick={handleInviteButtonClick} />
                {tabState === "myFriends" ? <MyFriends queryState={queryState} /> : <FindFriends queryState={queryState} />}
            </div>
            <ModalEmailInvite />
        </>
    );
};

export default Friends;

// TODO REUSE CONTACTS FLOW WITH FIXED UX
// const [contacts, setContacts] = useState<any[]>([]);
// const [isFetching, setIsFetching] = useState(true);
// useEffect(() => {
//     const googleFetchFunction = async () => {
//         try {
//             const response = await axios.get("/api/v1/contacts");
//             setContacts(response.data.connections);
//             setIsFetching(false);
//             return response;
//         } catch (error: any) {
//             console.log(error);
//         }
//     };
//     googleFetchFunction();
// }, []);
// {isFetching && <h2 className="mt-4">Loading...</h2>}
// {contacts && contacts.length > 0 && !giftqueueSearchData ? (
//     <div>
//         <p className="mt-4 relative right-2">
//             <span className="gqp">
//                 {contacts && contacts.length > 0 ? contacts.length : ""}
//             </span>{" "}
//             {contacts.length === 1 ? "Contact" : "Contacts"} found in your
//             google account!
//         </p>
//         <div className="mt-4 friendListCardGrid">
//             {contacts.slice(0, 25).map((contact) => {
//                 if (contact.names && contact.photos) {
//                     return (
//                         <FriendCard
//                             key={contact.metadata.sources[0].id}
//                             name={contact.names[0].displayName}
//                             image={contact.photos[0].url}
//                             isFriend={false}
//                             sub={contact.metadata.sources[1]?.id}
//                             inviteToGq={true}
//                         />
//                     );
//                 }
//             })}
//         </div>
//     </div>
// ) : (
//     <>
//         {giftqueueSearchData?.map((user) => {
//             if (!user.is_superuser) {
//                 return (
//                     <FriendCard
//                         key={user.id}
//                         name={`${user.first_name} ${user.last_name}`}
//                         image={session?.user?.image ?? ""}
//                         isFriend={false}
//                         fromGiftqueueBackend={true}
//                         gqId={user.id}
//                         displayName={user.display_name}
//                     />
//                 );
//             }
//         })}
//     </>
// )}

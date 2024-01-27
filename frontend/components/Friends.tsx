import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import FriendCard from "./FriendCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { TUser } from "../util/typesClientApi";
import { useFriendshipApi } from "../util/clientApi";

const Friends = () => {
    const { data: session } = useSession();
    const { getFriends } = useFriendshipApi()
    const { data: myFriendsData } = useQuery({
        queryKey: ["myFriends"],
        queryFn: getFriends,
    });
    const [queryState, setQueryState] = useState("");
    const [giftqueueSearchData, setGiftqueueSearchData] = useState<
        TUser[] | null
    >(null);


    const handleSearchInputChange = (e: any) => {
        setQueryState(e.target.value);
    };

    const handleSearchGiftqueueUsers = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_REGISTRY_API_BASE_URL}user/search?user=${queryState}`,
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );
            if (response?.data?.length > 0) {
                setGiftqueueSearchData(response.data);
            } else {
                setGiftqueueSearchData(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (queryState === "") {
                setGiftqueueSearchData(null);
            } else {
                handleSearchGiftqueueUsers();
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [queryState]);

    const imageSrc = (image?: string) => {
        if (image) {
            return `${process.env.NEXT_PUBLIC_REGISTRY_BASE_URL}${image}`
        }
        return ""
    }

    return (
        <div className="relative top-10 px-8">
            <h1 className="text-lg relative right-2">Friends List</h1>
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
                    placeholder="Search for friends"
                    value={queryState}
                    onChange={(e) => handleSearchInputChange(e)}
                    type="text"
                    name="search"
                />
            </label>
            {giftqueueSearchData && giftqueueSearchData.map((friend) => {
                console.log('search friend: ', friend)
                return (
                    <FriendCard
                        key={friend.id}
                        name={friend.display_name ?? `${friend.first_name} + ${friend.last_name}`}
                        image={imageSrc(friend.profile_image)}
                        isFriend={false}
                        fromGiftqueueBackend
                        gqId={friend.id}
                    />
                )
            }
            )}
            {!giftqueueSearchData && myFriendsData && myFriendsData.map((friend) => {
                console.log('friend: ', friend)
                return (
                    <FriendCard
                        key={friend.id}
                        name={friend.display_name ?? `${friend.first_name} + ${friend.last_name}`}
                        image={imageSrc(friend.profile_image)}
                        isFriend={true}
                        sub={friend.sub}
                    />
                )
            }
            )}
        </div>
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

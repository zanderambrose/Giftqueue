import { useState, useEffect } from "react";
import FriendCard from "../FriendCard";
import { TUser } from "../../util/typesClientApi";
import axios from "axios";
import { useSession } from "next-auth/react";

interface IFindFriendsProps {
    queryState: string
}

export const FindFriends = ({ queryState }: IFindFriendsProps) => {
    const { data: session } = useSession();
    const [giftqueueSearchData, setGiftqueueSearchData] = useState<
        TUser[] | null
    >(null);

    const imageSrc = (image?: string) => {
        if (image) {
            return `${process.env.NEXT_PUBLIC_REGISTRY_BASE_URL}${image}`
        }
        return ""
    }

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

    return (
        <div>
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
        </div>
    )
}

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

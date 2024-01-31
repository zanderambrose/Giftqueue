import { useQuery } from "@tanstack/react-query";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import FriendCard from "../FriendCard";
import { useFriendshipApi } from "../../util/clientApi";
import NoItemDefaultCard from "../NoItemDefaultCard";
import { InviteFriends } from "./inviteFriends";

interface IMyFriendsProps {
    queryState: string
}

export const MyFriends = ({ queryState }: IMyFriendsProps) => {
    // TODO - CLIENT SIDE QUERYSTATE FILTER BASED ON FETCHED DATA
    const { getFriends } = useFriendshipApi()
    const { data: myFriendsData } = useQuery({
        queryKey: ["myFriends"],
        queryFn: getFriends,
    });

    const imageSrc = (image?: string) => {
        if (image) {
            return `${process.env.NEXT_PUBLIC_REGISTRY_BASE_URL}${image}`
        }
        return ""
    }

    return (
        <>
            <InviteFriends friendsQty={10} handleClick={() => console.log('hello click')} />
            <div className="mt-4 friendListCardGrid">
                {myFriendsData && myFriendsData.map((friend) => {
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
                {!!myFriendsData && myFriendsData.length < 1 && <NoItemDefaultCard headingText="Your Friends List Is Empty" subText="Find friends to join you on your social journey!" icon={faUserGroup} ctaButton={false} />}
            </div>
        </>
    )
}

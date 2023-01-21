import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRegistryApi } from "../util/clientApi";

const MyGiftItems = () => {
  // RegistyApi
  const { getMyWishListItems } = useRegistryApi();
  // Queries
  const { data, isError, isSuccess } = useQuery({
    queryKey: ["myGiftItems"],
    queryFn: getMyWishListItems,
  });

  return (
    <>
      {data &&
        data.map((item: any) => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
              {item.url &&
                item.url.map((url: any) => {
                  return (
                    <>
                      <a href={url} target="_blank" key={url}>
                        Link
                      </a>
                    </>
                  );
                })}
            </div>
          );
        })}
    </>
  );
};

export default MyGiftItems;

import { useState } from "react";
import axios from "./axios";

export default function FavouriteButton({ item }) {
    const [favouriteId, setFavouriteId] = useState(item.favouriteId);

    const handleFavourite = (recipe) => {
        const { id } = recipe;
        (async () => {
            if (favouriteId === null) {
                const { data, status } = await axios.post(
                    "/api/recipes/favourite",
                    {
                        recipeId: id,
                    }
                );
                if (status === 200) {
                    console.log("add fave data: ", data);
                    setFavouriteId(data.favouriteId);
                }
            } else {
                const { status } = await axios.delete(
                    `/api/recipes/favourite/${id}`
                );
                if (status === 204) {
                    setFavouriteId(null);
                }
            }
        })();
    };

    return (
        <>
            <>
                <button
                    className="button-wrapper"
                    onClick={() => handleFavourite(item)}
                >
                    {favouriteId !== null
                        ? "Delete Favourite"
                        : "Add to Favourites"}
                </button>
            </>
        </>
    );
}

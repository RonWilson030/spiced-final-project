import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavourites, deleteFavourite } from "./actions";

export default function Favourites() {
    const dispatch = useDispatch();

    const favourites = useSelector((state) =>
        state.favourites.filter((item) => {
            return item;
        })
    );

    useEffect(() => {
        dispatch(getFavourites());
    }, []);

    return (
        <div>
            <div id="favourites">
                <div className="favourites-container">
                    {favourites.length > 0 ? (
                        <>
                            <div className="list-title">Favourite recipes:</div>
                            <div className="recipes-container">
                                {favourites.map((item) => (
                                    <div
                                        className="recipe-content"
                                        key={item.id}
                                    >
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img
                                                className="image hand-cursor"
                                                src={item.imageurl}
                                            ></img>
                                        </a>
                                        <a
                                            className="recipes-title"
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {item.title}
                                        </a>

                                        <button
                                            className="button-wrapper"
                                            onClick={() =>
                                                dispatch(
                                                    deleteFavourite(item.id)
                                                )
                                            }
                                        >
                                            Delete Favourite
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <h3>You have no favourite recipes saved!</h3>
                    )}
                </div>
            </div>
        </div>
    );
}

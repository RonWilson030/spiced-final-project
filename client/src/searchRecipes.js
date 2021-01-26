import FavouriteButton from "./favouriteButton";
import { useState } from "react";
import axios from "./axios";

export default function SearchRecipes() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [showMoreButton, setShowMoreButton] = useState(false);
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);

    const handleSearchByRecipes = () => {
        if (!query) {
            setRecipes([]);
            setQuery("");
            return;
        }

        let abort;

        (async () => {
            const { data, status } = await axios.get("/api/recipes/search", {
                params: { q: query },
            });
            // console.log("recipe data: ", data);
            if (!abort && status === 200) {
                setRecipes(data.recipes);
                setCategory("recipe");
                setShowMoreButton(true);
            } else {
                setError(true);
            }
        })();

        return () => {
            abort = true;
        };
    };

    const handleMoreRecipes = () => {
        let abort;

        (async () => {
            const { data, status } = await axios.get("/api/recipes/search", {
                params: { q: query, offset: 12 },
            });
            if (!abort && status === 200) {
                // console.log("more recipe data: ", data);
                setRecipes([...recipes, ...data.recipes]);
                setShowMoreButton(false);
                setQuery("");
            }
        })();

        return () => {
            abort = true;
        };
    };

    const handleSearchByIngredients = () => {
        if (!query) {
            setRecipes([]);
            setQuery("");
            return;
        }

        let abort;

        (async () => {
            const { data, status } = await axios.get("/api/recipes/search", {
                params: { q: query, category: "ingredients" },
            });
            if (!abort && status === 200) {
                setRecipes(data.recipes);
                setShowMoreButton(true);
            } else {
                setError(true);
            }
        })();

        return () => {
            abort = true;
        };
    };

    const handleMoreRecipesByIngredients = () => {
        let abort;

        (async () => {
            const { data, status } = await axios.get("/api/recipes/search", {
                params: { q: query, category: "ingredients", offset: 12 },
            });
            if (!abort && status === 200) {
                // console.log("more recipe data: ", data);
                setRecipes([...recipes, ...data.recipes]);
                setShowMoreButton(false);
                setQuery("");
            }
        })();

        return () => {
            abort = true;
        };
    };

    return (
        <div>
            <div id="recipes">
                <div className="search-recipes">
                    <div>
                        <div className="list-title">Search for recipes:</div>
                        <input
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="search recipes..."
                        />
                        <button onClick={handleSearchByRecipes}>
                            Search recipes
                        </button>
                    </div>

                    <div>
                        <div className="list-title">Search by ingredients:</div>
                        <input
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="search ingredients..."
                        />
                        <button onClick={handleSearchByIngredients}>
                            Search by ingredients
                        </button>
                    </div>
                </div>

                <div className="recipes-container">
                    {recipes &&
                        recipes.map((item) => (
                            <div className="recipe-content" key={item.id}>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        className="image hand-cursor"
                                        src={item.imageUrl}
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
                                <FavouriteButton item={item} />
                            </div>
                        ))}
                </div>

                <div>{error && <h2>No results found!</h2>}</div>

                {showMoreButton && (
                    <div className="center-btn">
                        {category === "recipe" ? (
                            <button onClick={handleMoreRecipes}>More</button>
                        ) : (
                            <button onClick={handleMoreRecipesByIngredients}>
                                More
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import {
    getShoppingList,
    deleteShoppingItem,
    addShoppingListItem,
} from "./actions";
import { useEffect } from "react";

export default function ShoppingList() {
    const [addItem, setAddItem] = useState("");

    const dispatch = useDispatch();

    const shoppingList = useSelector((state) =>
        state.shoppingList.filter((item) => {
            return item;
        })
    );

    useEffect(() => {
        dispatch(getShoppingList());
    }, []);

    const handleAddItem = () => {
        (async () => {
            const { data, status } = await axios.get("/api/shoppinglist/add", {
                params: { item: addItem },
            });
            if (status === 200) {
                console.log("shoppinglist data: ", data);
                dispatch(addShoppingListItem(data));
                setAddItem("");
            }
        })();
    };

    return (
        <div>
            <div id="shopping-list">
                <div className="shoppinglist-container">
                    <h2>Add to shopping list:</h2>
                    <input
                        onChange={(e) => setAddItem(e.target.value)}
                        placeholder="Add..."
                    />
                    <button onClick={handleAddItem}>Add item</button>

                    <div>
                        {shoppingList.length > 0 ? (
                            <>
                                <div className="list-title">Shopping list:</div>
                                <div className="shoppinglist-content">
                                    {shoppingList.map((item) => (
                                        <div key={item.id}>
                                            <ul>
                                                <li>
                                                    {item.item}
                                                    <button
                                                        className="list-btn"
                                                        onClick={() =>
                                                            dispatch(
                                                                deleteShoppingItem(
                                                                    item.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <h3>You have no items in your shopping list!</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

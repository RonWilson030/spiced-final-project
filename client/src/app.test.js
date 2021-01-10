import React from "react";
import App from "./app";
import axios from "./axios";
import { render, waitForElement } from "@testing-library/react";

// fake axios (my mock)
jest.mock("./axios");

// fake response from axios
axios.get.mockResolvedValue({
    data: {
        id: 1,
        first: "Ron",
        last: "Wilson",
        url: "www.google.com",
    },
});

test("app eventually renders the div", async () => {
    const { container } = render(<App />);

    console.log("container html before: ", container.innerHTML);

    // tell test to sit and wait for div to appear in DOM
    await waitForElement(() => container.querySelector("div"));

    console.log("container html after: ", container.innerHTML);

    expect(container.querySelector("div").children.length).toBe(1);
});

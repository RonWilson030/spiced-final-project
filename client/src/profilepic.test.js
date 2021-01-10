import React from "react";
import ProfilePic from "./profilepic";
import { render, fireEvent } from "@testing-library/react";

test("When no url is passed, /default.jpg is used as src", () => {
    const { container } = render(<ProfilePic />);

    // console.log("container querySelector img", container.querySelector("img"));

    // expect(container.querySelector("img").src)
    //     .endsWith("/default.png")
    //     .toBe(true);
});

test("When url is passed as a prop, that url is set as the value of the src attribute", () => {
    const { container } = render(<ProfilePic url="url_test" />);

    // console.log(
    //     "container querySelector img.src",
    //     container.querySelector("img").src
    // );

    // expect(container.querySelector("img").src).toBe("url_test");
});

test("When firs and last props are passed, first and last are assigned as the alue of the alt attribute", () => {
    const { container } = render(<ProfilePic first="ron" last="wilson" />);

    expect(container.querySelector("img").alt).toBe("ron wilson");
});

test("onClick prop runs when the img is clicked", () => {
    const mockOnClick = jest.fn();

    // not adding click handler, "onClick" is name of the prop!
    const { container } = render(<ProfilePic onClick={mockOnClick} />);

    // click on img in our test
    fireEvent.click(container.querySelector("img"));

    //confirm the click handler was triggered just oncee
    expect(mockOnClick.mock.calls.length).toBe(1);
});

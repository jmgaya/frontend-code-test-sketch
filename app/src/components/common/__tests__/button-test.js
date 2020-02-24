import React from "react";
import { render } from "@testing-library/react";
import Button from "../button";

const ANY_TEXT = "any-text";

it("renders text prop", () => {
  const { getByText } = render(<Button text={ANY_TEXT} />);
  expect(getByText(ANY_TEXT)).toBeTruthy();
});

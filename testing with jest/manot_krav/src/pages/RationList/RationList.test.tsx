import { render, screen } from "@testing-library/react";
import { RationList } from "./RationList";
import "@testing-library/jest-dom";

describe("RationList Component - Basic Rendering", () => {
  test("should render header and empty state correctly", () => {
    const { getByRole } = render(<RationList />);

    expect(getByRole("heading", { level: 2, name: "Field Rations Inventory" })).toHaveTextContent(
      "Field Rations Inventory"
    );

    expect(getByRole("button")).toHaveTextContent("Add New Ration");
  });
});

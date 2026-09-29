import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("exposes variant and size through data attributes", () => {
    render(
      <Badge variant="positive" size="sm">
        3
      </Badge>,
    );
    const badge = screen.getByText("3");
    expect(badge).toHaveAttribute("data-variant", "positive");
    expect(badge).toHaveAttribute("data-size", "sm");
  });

  it("defaults to the neutral md variant", () => {
    render(<Badge>x</Badge>);
    const badge = screen.getByText("x");
    expect(badge).toHaveAttribute("data-variant", "neutral");
    expect(badge).toHaveAttribute("data-size", "md");
  });
});

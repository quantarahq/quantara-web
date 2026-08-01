import { describe, expect, it } from "vitest";
import { truncateAddress } from "./format";

describe("truncateAddress", () => {
  it("truncates long addresses to first 8 and last 6 characters", () => {
    const address = "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCDEF";

    expect(truncateAddress(address)).toBe("CAAAAAAA…ABCDEF");
  });

  it("leaves short addresses untouched", () => {
    expect(truncateAddress("short")).toBe("short");
  });

  it("leaves addresses at the boundary length untouched", () => {
    const address = "1234567890123456";

    expect(truncateAddress(address)).toBe(address);
  });
});

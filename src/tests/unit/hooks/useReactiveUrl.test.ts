import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useReactiveUrl } from "@src/hooks/useReactiveUrl";

describe("useReactiveUrl", () => {
  test("should return the provided url", () => {
    const { result } = renderHook(() => useReactiveUrl("https://example.com/"));

    expect(result.current.url).toBe("https://example.com/");
  });

  test("should include the query strings", () => {
    const { result } = renderHook(() =>
      useReactiveUrl("https://example.com/?search=xyz"),
    );

    expect(result.current.url).toBe("https://example.com/?search=xyz");
  });

  test("should add new query strings", () => {
    const { result } = renderHook(() => useReactiveUrl("https://example.com/"));

    act(() => result.current.updateParams({ search: "xyz" }));

    expect(result.current.url).toBe("https://example.com/?search=xyz");
  });

  test("should update query strings", () => {
    const { result } = renderHook(() =>
      useReactiveUrl("https://example.com/?search=xyz&name=john"),
    );

    act(() => result.current.updateParams({ search: "abc" }));

    expect(result.current.url).toBe(
      "https://example.com/?search=abc&name=john",
    );
  });

  test("should remove query strings", () => {
    const { result } = renderHook(() =>
      useReactiveUrl("https://example.com/?search=xyz"),
    );

    act(() => result.current.updateParams({ search: "" }));

    expect(result.current.url).toBe("https://example.com/");
  });

  test("should add multiple query strings", () => {
    const { result } = renderHook(() => useReactiveUrl("https://example.com/"));

    act(() => result.current.updateParams({ search: "xyz", name: "john" }));

    expect(result.current.url).toBe(
      "https://example.com/?search=xyz&name=john",
    );
  });

  test("should not remove existing query strings", () => {
    const { result } = renderHook(() =>
      useReactiveUrl("https://example.com/?search=xyz&name=john"),
    );

    act(() => result.current.updateParams({ gender: "male" }));

    expect(result.current.url).toBe(
      "https://example.com/?search=xyz&name=john&gender=male",
    );
  });
});

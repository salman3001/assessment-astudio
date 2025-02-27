export default function createQs(params: Record<string, string | number>) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value.toString());
    }
  });

  return searchParams.toString();
}

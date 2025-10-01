export const getElements = async(page) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/permission/getElement`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({page}),
      }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    return result.elements;
}

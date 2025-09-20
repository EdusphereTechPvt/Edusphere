export const getElements = async(elements,role="default") => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/permission/getElement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({page: elements, role}),
      }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }
    console.log("first",result)
    return result;
}

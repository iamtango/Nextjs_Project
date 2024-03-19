const LabelApi = () => {
  const getLables = async (pageNumber = 1, searchText = "") => {
    try {
      const searchQuery = searchText ? `&search=${searchText}` : "";
      const response = await fetch(
        `${Label_URL}?page=${pageNumber}&${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      );
      console.log("response:", response);
      if (response.ok) {
        const data = await response.json();
        return await data;
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
};

export default LabelApi;

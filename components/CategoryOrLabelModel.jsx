import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label_URL, Category_URL } from "@/config/constant";
import Tabelmodel from "./commanComponents/Tabelmodel";
import DeleteConfirmModel from "./commanComponents/DeleteConfirmModel";
import UpdateOrPostLabelModel from "./UpdateOrPostLabelModel";
import { usePathname } from "next/navigation";

const CategoryOrLabelModel = ({
  myData,
  setMyData,
  filterMyData,
  setFilterMyData,
}) => {
  const { data: session } = useSession();
  const [searchText, setSearchText] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [paginationButtons, setPaginationButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postMyData, setPostMyData] = useState({
    ...myData,
    name: "",
    is_visible: "",
  });

  const UrlPath = usePathname();
  const URL = UrlPath.includes("category") ? Category_URL : Label_URL;

  const validationSchema = Yup.object({
    name: Yup.string().required("Label Name is required"),
    is_visible: Yup.number().required("Visiblity is required"),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (pageNumber = 1, searchText = "") => {
    try {
      if (!session?.user?.token) {
        console.log("No bearer token available.");
        return;
      }

      const searchQuery = searchText ? `&search=${searchText}` : "";
      const response = await fetch(`${URL}?page=${pageNumber}&${searchQuery}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });
      console.log("response:", response);
      if (response.ok) {
        const data = await response.json();
        setMyData(data.data);
        setFilterMyData(data.data);
        const lastPage = data.meta.last_page;
        const buttons = [];
        for (let i = 1; i <= lastPage; i++) {
          buttons.push(i);
        }
        setPaginationButtons(buttons);
        if (searchText && lastPage > 1) {
          setCurrentPage(1);
        }
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteData = async (slug) => {
    setShowDeleteModal(true);
    setSlug(slug);
  };

  const handleDeleteSubmit = async () => {
    try {
      if (!slug) {
        console.error("No delete ID provided.");
        return;
      }

      const response = await fetch(`${URL}/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });
      toast.error("Label deleted successfully");

      if (response.ok) {
        fetchData();
        setShowDeleteModal(false);
      } else {
        console.error("Error deleting the record:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePostData = () => {
    setShowPostModal(true);
    setPostMyData({
      ...postMyData,
      slug: undefined,
      name: "",
      is_visible: "",
    });
  };

  const handleLabelSubmit = async (values) => {
    try {
      console.log("values are here", values);
      // if (!values.name || !values.is_visible) {
      //   toast.error("Please fill in all required fields.");
      //   return;
      // }

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          ...values,
        }),
      });

      console.log("response -->", response);
      if (!response.ok) {
        console.log("Failed to submit data");
      } else {
        toast.success("Data submitted successfully");
        fetchData();
        setShowPostModal(false);
        setOpen(false);

        setPostMyData({
          ...postMyData,
          name: "",
          is_visible: "",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  const handleUpdateData = (slug) => {
    try {
      setSlug(slug);
      console.log("slug ->", slug);
      const selectedHelpTopic = myData?.filter((topic) => topic.slug === slug);
      console.log("postedHelpTopics ->", selectedHelpTopic);
      if (selectedHelpTopic) {
        setPostMyData(selectedHelpTopic[0]);
        console.log("postedHelpTopics ->", myData);
        setShowPostModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateSubmit = async (values) => {
    try {
      if (!values.name || !values.is_visible) {
        toast.error("Please fill in all required fields.");
        return;
      }
      const response = await fetch(`${URL}/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({
          ...values,
        }),
      });
      if (!response.ok) {
        console.log("Failed to submit data");
      } else {
        toast.info("Data Updated successfully");
        fetchData();
        setShowPostModal(false);
        setOpen(false);
        setPostMyData({
          ...postMyData,
          name: "",
          is_visible: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {session?.user?.token ? (
        <>
          <ToastContainer />

          <Tabelmodel
            title={UrlPath.includes("category") ? "Category" : "Label"}
            searchText={searchText}
            setSearchText={setSearchText}
            myData={myData}
            filterData={filterMyData}
            setFilterData={setFilterMyData}
            handlePostData={handlePostData}
            handleUpdateData={handleUpdateData}
            handleDeleteData={handleDeleteData}
            paginationButtons={paginationButtons}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            fetchData={fetchData}
          />
        </>
      ) : (
        <div>No data available without a token</div>
      )}

      {showPostModal && (
        <UpdateOrPostLabelModel
          postMyData={postMyData}
          setPostMyData={setPostMyData}
          modelName={UrlPath.includes("category") ? "Category" : "Label"}
          setShowPostModal={setShowPostModal}
          myData={myData}
          validationSchema={validationSchema}
          handleUpdateSubmit={handleUpdateSubmit}
          handleLabelSubmit={handleLabelSubmit}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModel
          modelName={UrlPath.includes("category") ? "Category" : "Label"}
          handleDeleteSubmit={handleDeleteSubmit}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </>
  );
};
export default CategoryOrLabelModel;

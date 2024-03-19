import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label_URL } from "@/config/constant";
import Tabelmodel from "./commanComponents/Tabelmodel";
import DeleteConfirmModel from "./commanComponents/DeleteConfirmModel";
import UpdateOrPostLabelModel from "./UpdateOrPostLabelModel";
import { usePathname } from "next/navigation";

const LableTable = ({
  lableData,
  setLableData,
  filterLabelData,
  setFilterLabelData,
}) => {
  const { data: session } = useSession();

  const router = usePathname();
  console.log("router.pathname.", router.includes("category"));
  const [searchText, setSearchText] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [paginationButtons, setPaginationButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postLabel, setPostLabel] = useState({
    ...lableData,
    name: "",
    is_visible: "",
  });

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
        setLableData(data.data);
        setFilterLabelData(data.data);
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

  const handleLabelDelete = async (slug) => {
    setShowDeleteModal(true);
    setSlug(slug);
  };

  const handleLabelDeleteSubmit = async () => {
    try {
      if (!slug) {
        console.error("No delete ID provided.");
        return;
      }

      const response = await fetch(`${Label_URL}/${slug}`, {
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

  const handlePostLabelData = () => {
    setShowPostModal(true);
    setPostLabel({
      ...postLabel,
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

      const response = await fetch(Label_URL, {
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

        setPostLabel({
          ...postLabel,
          name: "",
          is_visible: "",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
    }
  };

  const handleLabelUpdate = (slug) => {
    try {
      setSlug(slug);
      console.log("slug ->", slug);
      const selectedHelpTopic = lableData?.filter(
        (topic) => topic.slug === slug
      );
      console.log("postedHelpTopics ->", selectedHelpTopic);
      if (selectedHelpTopic) {
        setPostLabel(selectedHelpTopic[0]);
        console.log("postedHelpTopics ->", lableData);
        setShowPostModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLabelUpdateSubmit = async (values) => {
    try {
      if (!values.name || !values.is_visible) {
        toast.error("Please fill in all required fields.");
        return;
      }
      const response = await fetch(`${Label_URL}/${slug}`, {
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
        setPostLabel({
          ...postLabel,
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
            title={"Labels"}
            searchText={searchText}
            setSearchText={setSearchText}
            myData={lableData}
            filterData={filterLabelData}
            setFilterData={setFilterLabelData}
            handlePostData={handlePostLabelData}
            handleUpdateData={handleLabelUpdate}
            handleDeleteData={handleLabelDelete}
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
          postLabel={postLabel}
          setPostLabel={setPostLabel}
          modelName={"Label"}
          setShowPostModal={setShowPostModal}
          lableData={lableData}
          validationSchema={validationSchema}
          handleUpdateSubmit={handleLabelUpdateSubmit}
          handleLabelSubmit={handleLabelSubmit}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModel
          modelName={"Label"}
          handleTopicDeleteSubmit={handleLabelDeleteSubmit}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </>
  );
};

export default LableTable;

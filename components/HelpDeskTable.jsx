import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";

import DeleteConfirmModel from "./commanComponents/DeleteConfirmModel";
import { useSession } from "next-auth/react";
import { Help_Topic_URL } from "@/config/constant";
import UpdateOrPostTopicModel from "./UpdateOrPostTopicModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import Tabelmodel from "./commanComponents/Tabelmodel";
import SearchModel from "./commanComponents/SearchModel";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  TrashIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/20/solid";

export default function HelpDeskTable({
  data,
  helpTopics,
  setHelpTopics,
  filterHelpTopics,
  setFilterHelpTopics,
}) {
  const [searchText, setSearchText] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [paginationButtons, setPaginationButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [slug, setSlug] = useState("");
  const [postTopic, setPostTopic] = useState({
    ...helpTopics,
    name: "",
    auth_code: "",
    dept_id: "",
    priority: "",
    status: "",
    autoresp: "",
  });
  const { data: session } = useSession();

  const validationSchema = Yup.object({
    name: Yup.string().required("Help Topic is required"),
    auth_code: Yup.string().required("Auth Code is required"),
    dept_id: Yup.string().required("Department is required"),
    priority: Yup.string().required("Ticket Priority is required"),
    status: Yup.string().required("Status is required"),
  });

  const Help_Topic_URL = "http://192.168.0.125:91/api/help-topics";

  const columns = useMemo(() => {
    if (!helpTopics || helpTopics.length === 0) return [];
    const firstRow = helpTopics[0];
    return Object.keys(firstRow).map((key) => ({
      Header: key.toUpperCase(),
      accessor: key,
    }));
  }, [helpTopics]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data: filterHelpTopics,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setHelpTopics(data);
    setFilterHelpTopics(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!session?.user?.token) {
        console.log("No bearer token available.");
        return;
      }
      const response = await fetch(Help_Topic_URL, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response data available ->", data);
        setHelpTopics(data.data);
        setFilterHelpTopics(data.data);
        const lastPage = data.meta.last_page;
        const buttons = [];
        for (let i = 1; i <= lastPage; i++) {
          buttons.push(i);
        }
        setPaginationButtons(buttons);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePost = async () => {
    setShowPostModal(true);
  };

  const handlePostSubmit = async () => {
    try {
      // const postedHelpTopics = [...helpTopics, postTopic];
      // setHelpTopics(postedHelpTopics);
      // setFilterHelpTopics(postedHelpTopics);

      if (!postTopic.id) {
        const newTopic = { ...postTopic, id: Date.now() }; // Assign a unique id
        const updatedHelpTopics = [...helpTopics, newTopic];
        setHelpTopics(updatedHelpTopics);
        setFilterHelpTopics(updatedHelpTopics);
      }

      setShowPostModal(false);
      setPostTopic({
        id: null,
        help_topic: "",
        status: "",
        autoresponse: "",
        inventory_type: "",
        department: "",
        priority: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = async (id) => {
    console.log(`Delete ${id}`);
    setShowDeleteModal(true);
    const deleteHelpTopics = helpTopics.filter((topic) => topic.id !== id);
    setDeleteId(id);
    // setDeleteId(deleteHelpTopics);
    // setHelpTopics(deleteHelpTopics);
    // setFilterHelpTopics(deleteHelpTopics);
    // setShowDeleteModal(false);
  };

  const handleDeleteSubmit = async () => {
    try {
      console.log(" deleteHelpTopics ->", deleteId);
      setHelpTopics(deleteId);
      setFilterHelpTopics(deleteId);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = (id) => {
    try {
      const postedHelpTopics = helpTopics?.find((topic) => topic.id === id);
      console.log("postedHelpTopics ->", postedHelpTopics);
      setPostTopic((prevUpdate) => ({
        ...prevUpdate,
        id: id,
        help_topic: postedHelpTopics.help_topic,
        status: postedHelpTopics.status,
        autoresponse: postedHelpTopics.autoresponse,
        inventory_type: postedHelpTopics.inventory_type,
        department: postedHelpTopics.department,
        priority: postedHelpTopics.priority,
      }));
      setShowPostModal(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      if (postTopic.id) {
        const updatedHelpTopics = helpTopics.map((topic) => {
          if (topic.id === postTopic.id) {
            return postTopic; // Update the existing record
          } else {
            return topic; // Keep other records unchanged
          }
        });
        setHelpTopics(updatedHelpTopics);
        setFilterHelpTopics(updatedHelpTopics);
      }
      setShowPostModal(false);
      setPostTopic({
        id: null,
        help_topic: "",
        status: "",
        autoresponse: "",
        inventory_type: "",
        department: "",
        priority: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const fetchData = async (pageNumber = 1, searchText = "") => {
  //   try {
  //     if (!session?.user?.token) {
  //       console.log("No bearer token available.");
  //       return;
  //     }
  //     const searchQuery = searchText ? `&search=${searchText}` : "";
  //     const response = await fetch(
  //       `${Help_Topic_URL}?page=${pageNumber}&${searchQuery}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${session?.user?.token}`,
  //         },
  //       }
  //     );
  //     // console.log("response:", response);
  //     if (response.ok) {
  //       const data = await response.json();
  //       // console.log("Response data available ->", data);
  //       setHelpTopics(data.data);
  //       setFilterHelpTopics(data.data);
  //       const lastPage = data.meta.last_page;
  //       const buttons = [];
  //       for (let i = 1; i <= lastPage; i++) {
  //         buttons.push(i);
  //       }
  //       setPaginationButtons(buttons);
  //       if (searchText && lastPage > 1) {
  //         setCurrentPage(1);
  //       }
  //     } else {
  //       console.error("Error fetching data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleHelpTopic = () => {
  //   setShowPostModal(true);
  //   setPostTopic({
  //     ...postTopic,
  //     slug: undefined,
  //     name: "",
  //     auth_code: "",
  //     dept_id: "",
  //     priority: "",
  //     status: "",
  //     autoresp: "",
  //   });
  // };

  // const handleHelpTopicSubmit = async (values) => {
  //   try {
  //     console.log("values are here", values);
  //     if (
  //       !values.name ||
  //       !values.auth_code ||
  //       !values.priority ||
  //       !values.dept_id ||
  //       !values.status
  //     ) {
  //       toast.error("Please fill in all required fields.");
  //       return;
  //     }
  //     const response = await fetch(Help_Topic_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${session?.user?.token}`,
  //       },
  //       body: JSON.stringify({
  //         ...values,
  //       }),
  //     });
  //     // console.log("values here in the post", values);
  //     if (!response.ok) {
  //       console.log("Failed to submit data");
  //     } else {
  //       toast.success("Data submitted successfully");
  //       fetchData();
  //       setShowPostModal(false);
  //       setOpen(false);

  //       setPostTopic({
  //         ...postTopic,
  //         name: "",
  //         auth_code: "",
  //         dept_id: "",
  //         status: "",
  //         priority: "",
  //         autoresp: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error.message);
  //   }
  // };

  // const handleTopicDelete = async (slug) => {
  //   // console.log(`Delete ${slug}`);
  //   setShowDeleteModal(true);
  //   setSlug(slug);
  // };

  // const handleTopicDeleteSubmit = async () => {
  //   try {
  //     // console.log(" deleteHelpTopics ->", deleteId);
  //     if (!slug) {
  //       console.error("No delete ID provided.");
  //       return;
  //     }

  //     const response = await fetch(`${Help_Topic_URL}/${slug}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${session?.user?.token}`,
  //       },
  //     });
  //     toast.error("Help topic deleted successfully");
  //     // console.log(`response-> ${response}`);

  //     if (response.ok) {
  //       fetchData();
  //       setShowDeleteModal(false);
  //     } else {
  //       console.error("Error deleting the record:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleTopicUpdate = (slug) => {
  //   try {
  //     setSlug(slug);
  //     const selectedHelpTopic = helpTopics?.filter(
  //       (topic) => topic.slug === slug
  //     );
  //     // console.log("postedHelpTopics ->", selectedHelpTopic);
  //     if (selectedHelpTopic) {
  //       setPostTopic(selectedHelpTopic[0]);
  //       setShowPostModal(true);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleTopicUpdateSubmit = async (values) => {
  //   try {
  //     if (
  //       !values.name ||
  //       !values.auth_code ||
  //       !values.priority ||
  //       !values.dept_id ||
  //       !values.status
  //     ) {
  //       toast.error("Please fill in all required fields.");
  //       return;
  //     }

  //     const response = await fetch(Help_Topic_URL, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${session?.user?.token}`,
  //       },
  //       body: JSON.stringify({
  //         ...values,
  //         slug: slug,
  //       }),
  //     });

  //     if (!response.ok) {
  //       console.log("Failed to submit data");
  //     } else {
  //       toast.info("Data Updated successfully");
  //       fetchData();
  //       setShowPostModal(false);
  //       setOpen(false);
  //       setPostTopic({
  //         ...postTopic,
  //         name: "",
  //         auth_code: "",
  //         dept_id: "",
  //         status: "",
  //         priority: "",
  //         autoresp: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <>
      {/* {session?.token ? ( */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Help Topics
            </h1>
          </div>
          {/* Search box started */}
          <SearchModel
            searchText={searchText}
            setSearchText={setSearchText}
            helpTopics={helpTopics}
            setFilterHelpTopics={setFilterHelpTopics}
          />

          {/* Search box ended */}
          <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-2 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-gray-800 hover:bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => handlePost()}>
              Add Topic
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root sm:items-center">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table
                  {...getTableProps()}
                  className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-100">
                    {headerGroups.map((hg) => (
                      <tr {...hg.getHeaderGroupProps()}>
                        {hg.headers.map((column) => (
                          <th
                            key={column.id}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " ▼"
                                  : " ▲"
                                : ""}
                            </span>
                          </th>
                        ))}

                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ACTIONS
                        </th>
                      </tr>
                    ))}
                  </thead>
                  {searchText === "" ? (
                    <tbody
                      {...getTableBodyProps()}
                      className="divide-y divide-gray-200 bg-white ">
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={i}
                            className="hover:bg-gray-200">
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}

                            <td className="whitespace-nowrap px-3 py-4 text-sm  flex gap-2 text-gray-500">
                              <button
                                type="button"
                                className="block rounded-md  px-2 py-1 text-center text-black hover:text-green-600 text-sm font-semibold focus-visible:outline-indigo-600"
                                onClick={() => handleUpdate(row?.original?.id)}>
                                <ArrowUpOnSquareIcon className="h-6" />
                              </button>

                              <button
                                type="button"
                                className="block rounded-md  px-2 py-1 text-center  text-sm font-semibold text-black hover:text-red-700 focus-visible:outline-indigo-600"
                                onClick={() => handleDelete(row?.original?.id)}>
                                <TrashIcon className="h-6" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody className="divide-y divide-gray-200 bg-white ">
                      {filterHelpTopics?.map((filteredData, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {filteredData.help_topic}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {filteredData.status}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {filteredData.autoresponse}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {filteredData.inventory_type}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {filteredData.department}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {filteredData.priority}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm  flex gap-2 text-gray-500">
                            <button
                              type="button"
                              className="block rounded-md  px-2 py-1 text-center text-sm font-semibold text-black hover:text-green-600 focus-visible:outline-indigo-600"
                              onClick={() => handleUpdate(row?.original?.id)}>
                              <ArrowUpOnSquareIcon className="h-6" />
                            </button>

                            <button
                              type="button"
                              className="block rounded-md  px-2 py-1 text-center text-sm font-semibold text-black  hover:text-red-700 focus-visible:outline-indigo-600"
                              onClick={() => handleDelete(row?.original?.id)}>
                              <TrashIcon className="h-6" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>

                {/* Pagination start */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">{pageIndex + 1}</span> to{" "}
                        <span className="font-medium"> </span> of{" "}
                        <span className="font-medium">{pageCount}</span> results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination">
                        <button
                          onClick={previousPage}
                          disabled={!canPreviousPage}
                          className={`relative inline-flex items-center rounded-l-md px-2 py-2
                         text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 
                         focus:outline-offset-0
                         ${
                           pageIndex === 0
                             ? "cursor-not-allowed"
                             : "cursor-pointer"
                         }
                         `}>
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {/* <button
                          href="#"
                          aria-current="page"
                          className={`relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                        ${
                          !canNextPage ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                        >
                          1{pageIndex + 1}
                        </button> */}

                        {paginationButtons &&
                          paginationButtons.map((page, index) => (
                            <button
                              key={index}
                              className={`relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                                currentPage === page
                                  ? " text-white"
                                  : " bg-indigo-300 text-gray-800 hover:bg-indigo-900"
                              }  `}
                              onClick={() => handlePageClick(page)}>
                              {page}
                            </button>
                          ))}
                        <button
                          href="#"
                          className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                            !canNextPage
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}>
                          <span
                            className="sr-only"
                            onClick={nextPage}
                            disabled={!canNextPage}>
                            Next
                          </span>
                          <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
                {/* Pagination end */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        <div>No data available without a token</div>
      )} */}

      {showPostModal && (
        <UpdateOrPostTopicModel
          postTopic={postTopic}
          setPostTopic={setPostTopic}
          helpTopics={helpTopics}
          handlePostSubmit={handlePostSubmit}
          handleUpdateSubmit={handleUpdateSubmit}
          modelName={"Help Topics"}
          setShowPostModal={setShowPostModal}
          help_topic={postTopic.help_topic}
          status={postTopic.status}
          autoresponse={postTopic.autoresponse}
          inventory_type={postTopic.inventory_type}
          department={postTopic.department}
          priority={postTopic.priority}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModel
          modelName={"Help Topics"}
          handleDeleteSubmit={handleDeleteSubmit}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {/* {session?.user?.token ? (
        <>
          <ToastContainer />

          <Tabelmodel
            title={"Help Topics"}
            searchText={searchText}
            setSearchText={setSearchText}
            myData={helpTopics}
            filterData={filterHelpTopics}
            setFilterData={setFilterHelpTopics}
            handlePostData={handleHelpTopic}
            handleUpdateData={handleTopicUpdate}
            handleDeleteData={handleTopicDelete}
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
        <UpdateOrPostTopicModel
          postTopic={postTopic}
          setPostTopic={setPostTopic}
          modelName={"Help Topics"}
          setShowPostModal={setShowPostModal}
          helpTopics={helpTopics}
          validationSchema={validationSchema}
          handleTopicUpdateSubmit={handleTopicUpdateSubmit}
          handleHelpTopicSubmit={handleHelpTopicSubmit}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModel
          modelName={"Help Topics"}
          handleDeleteSubmit={handleTopicDeleteSubmit}
          setShowDeleteModal={setShowDeleteModal}
        />
      )} */}
    </>
  );
}

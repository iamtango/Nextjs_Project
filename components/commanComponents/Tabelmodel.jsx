import React, { useEffect, useMemo } from "react";
import SearchModel from "./SearchModel";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  TrashIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/20/solid";
import { useTable, useSortBy, usePagination } from "react-table";

const Tabelmodel = ({
  title,
  searchText,
  setSearchText,
  myData,
  filterData,
  setFilterData,
  handlePostData,
  handleUpdateData,
  handleDeleteData,
  paginationButtons,
  currentPage,
  setCurrentPage,
  fetchData,
}) => {
  console.log("Tabel model =>", myData);
  const columns = useMemo(() => {
    if (!myData || myData.length === 0) return [];
    const firstRow = myData[0];
    console.log("FirstRow here ", firstRow);
    return Object.keys(firstRow)
      .filter((key) => key !== "id" && key !== "slug")
      .map((key) => ({
        Header: key.toUpperCase(),
        accessor: key,
      }));
  }, [myData]);

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
      data: filterData,
      initialState: { pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    handlePageClick();
  }, [searchText]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchData(page, searchText);
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
        </div>

        {/* Search box started */}
        <SearchModel
          searchText={searchText}
          setSearchText={setSearchText}
          setFilterData={setFilterData}
          myData={myData}
        />
        {/* Search box ended */}

        <div className="mt-4 sm:ml-16 sm:mt-0 flex gap-2 sm:flex-none">
          {/* <Link
                href={"/help-topics/topic"}
                className="block rounded-md bg-gray-800 hover:bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Topic
              </Link> */}
          <button
            type="button"
            className="block rounded-md bg-gray-800 hover:bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handlePostData()}
          >
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
                className="min-w-full divide-y divide-gray-300"
              >
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
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " ▼"
                                : " ▲"
                              : " ▲"}
                          </span>
                        </th>
                      ))}

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        ACTIONS
                      </th>
                    </tr>
                  ))}
                </thead>
                {searchText === "" ? (
                  <tbody
                    {...getTableBodyProps()}
                    className="divide-y divide-gray-200 bg-white "
                  >
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr
                          {...row.getRowProps()}
                          key={row.original.slug}
                          className="hover:bg-gray-200"
                        >
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}

                          <td className="whitespace-nowrap px-3 py-4 text-sm  flex gap-2 text-gray-500">
                            <button
                              type="button"
                              className="block rounded-md  px-2 py-1 text-center text-black hover:text-green-600 text-sm font-semibold focus-visible:outline-indigo-600"
                              onClick={() =>
                                handleUpdateData(row?.original?.slug)
                              }
                            >
                              <ArrowUpOnSquareIcon className="h-6">
                                update button
                              </ArrowUpOnSquareIcon>
                            </button>
                            <button
                              type="button"
                              className="block rounded-md  px-2 py-1 text-center  text-sm font-semibold text-black hover:text-red-700 focus-visible:outline-indigo-600"
                              onClick={() =>
                                handleDeleteData(row?.original?.slug)
                              }
                            >
                              <TrashIcon className="h-6">
                                Delete button
                              </TrashIcon>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody className="divide-y divide-gray-200 bg-white ">
                    {filterData?.map((filteredData, i) => (
                      <tr key={i} className="hover:bg-gray-100">
                        {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {filteredData.name}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {filteredData.slug}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {filteredData.created_at}
                        </td> 
                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {filteredData.updated_at}
                        </td>*/}
                        {Object.keys(filteredData).map((key, index) => {
                          if (key !== "slug" && key !== "id") {
                            return (
                              <td
                                // key={index}
                                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                {filteredData[key]} {filteredData[key.slug]}
                              </td>
                            );
                          }
                          return null;
                        })}

                        <td className="whitespace-nowrap px-3 py-4 text-sm  flex gap-2 text-gray-500">
                          <button
                            type="button"
                            className="block rounded-md  px-2 py-1 text-center text-sm font-semibold text-black hover:text-green-600 focus-visible:outline-indigo-600"
                            onClick={() =>
                              handleUpdateData(row?.original?.slug)
                            }
                          >
                            <ArrowUpOnSquareIcon className="h-6">
                              update button
                            </ArrowUpOnSquareIcon>
                          </button>

                          <button
                            type="button"
                            className="block rounded-md  px-2 py-1 text-center text-sm font-semibold text-black  hover:text-red-700 focus-visible:outline-indigo-600"
                            onClick={() =>
                              handleDeleteData(row?.original?.slug)
                            }
                          >
                            <TrashIcon className="h-6">Delete button</TrashIcon>
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
                      aria-label="Pagination"
                    >
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
                         `}
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>

                      {paginationButtons &&
                        paginationButtons.map((page, index) => (
                          <button
                            key={index}
                            className={`relative z-10 inline-flex items-center bg-indigo-500 hover:bg-indigo-800 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                              currentPage === page
                                ? "bg-indigo-700 text-white"
                                : "  text-gray-800 "
                            }  `}
                            onClick={() => handlePageClick(page)}
                          >
                            {page}
                          </button>
                        ))}
                      <button
                        href="#"
                        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                          !canNextPage ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <span
                          className="sr-only"
                          onClick={nextPage}
                          disabled={!canNextPage}
                        >
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
  );
};

export default Tabelmodel;

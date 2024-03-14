export default function HelpDeskTable() {
  const { data: session } = useSession();
  const [helpTopics, setHelpTopics] = useState([]);
  const [filterHelpTopics, setFilterHelpTopics] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (session?.token) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.0.125:91/api/help-topics", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHelpTopics(data);
        setFilterHelpTopics(data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Define columns based on the first row of the data
  const columns = useMemo(() => {
    if (helpTopics.length === 0) return [];

    const firstRow = helpTopics[0];
    return Object.keys(firstRow).map((key) => ({
      Header: key.toUpperCase(),
      accessor: key,
    }));
  }, [helpTopics]);

  // Define table instance using react-table hooks
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

  // Render the table headers and data rows
  return (
    <>
      {session?.token ? (
        <div className="table-container">
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
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
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="divide-y divide-gray-200 bg-white"
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="hover:bg-gray-200"
                    key={i}
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
                        className="block rounded-md  px-2 py-1 text-center text-sm font-semibold text-black hover:text-green-600 text-sm font-semibold focus-visible:outline-indigo-600"
                        onClick={() => handleUpdate(row?.original?.id)}
                      >
                        <ArrowUpOnSquareIcon className="h-6" />
                      </button>

                      <button
                        type="button"
                        className="block rounded-md  px-2 py-1 text-center  text-sm font-semibold text-black hover:text-red-700 focus-visible:outline-indigo-600"
                        onClick={() => handleDelete(row?.original?.id)}
                      >
                        <TrashIcon className="h-6" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No data available without a token</div>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="mx-1 px-3 py-1 bg-gray-200 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="mx-1 px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </>
  );

  return (
    <>
      {session?.token && (
        <>
          <SearchModel searchText={searchText} setSearchText={setSearchText} />

          <div className="table-container">
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
                            : ""}
                        </span>
                      </th>
                    ))}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Actions
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="divide-y divide-gray-200 bg-white"
              >
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="hover:bg-gray-200"
                      key={i}
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
                          className="block rounded-md  px-2 py-1 text-center text-sm font-semibold text-black hover:text-green-600 text-sm font-semibold focus-visible:outline-indigo-600"
                          onClick={() => handleUpdate(row?.original?.id)}
                        >
                          <ArrowUpOnSquareIcon className="h-6" />
                        </button>

                        <button
                          type="button"
                          className="block rounded-md  px-2 py-1 text-center  text-sm font-semibold text-black hover:text-red-700 focus-visible:outline-indigo-600"
                          onClick={() => handleDelete(row?.original?.id)}
                        >
                          <TrashIcon className="h-6" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="mx-1 px-3 py-1 bg-gray-200 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="mx-1 px-3 py-1 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
}

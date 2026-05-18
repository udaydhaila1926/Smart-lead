import { useEffect, useState } from "react";

import debounce from "lodash.debounce";

import { CSVLink } from "react-csv";

import DashboardLayout from "../layouts/DashboardLayout";

import LeadForm from "../components/LeadForm";
import LeadsTable from "../components/LeadsTable";
import LeadFilters from "../components/LeadFilters";

import api from "../services/api";

import type { Lead } from "../types/lead";

const DashboardPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [source, setSource] = useState("");

  const [sort, setSort] =
    useState("latest");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await api.get("/leads", {
        params: {
          search,
          status,
          source,
          sort,
          page,
        },
      });

      setLeads(res.data.leads);

      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = debounce(
    fetchLeads,
    500
  );

  useEffect(() => {
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [search, status, source, sort, page]);

  return (
    <DashboardLayout>
      <LeadForm fetchLeads={fetchLeads} />

      <div className="flex justify-end mb-4">
  <CSVLink
    data={leads}
    filename="leads.csv"
    className="bg-green-500 text-white px-4 py-2 rounded"
  >
    Export CSV
  </CSVLink>
</div>

      <LeadFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        source={source}
        setSource={setSource}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          Loading leads...
        </div>
      ) : (
        <>
          <LeadsTable
            leads={leads}
            fetchLeads={fetchLeads}
          />

          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
              className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Prev
            </button>

            <span className="font-semibold">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) => prev + 1)
              }
              className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
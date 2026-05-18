interface Props {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  source: string;
  setSource: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

const LeadFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
  sort,
  setSort,
}: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 grid md:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Search by name/email"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border p-3 rounded"
      >
        <option value="">
          All Status
        </option>

        <option value="New">New</option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">Lost</option>
      </select>

      <select
        value={source}
        onChange={(e) =>
          setSource(e.target.value)
        }
        className="border p-3 rounded"
      >
        <option value="">
          All Sources
        </option>

        <option value="Website">
          Website
        </option>

        <option value="Instagram">
          Instagram
        </option>

        <option value="Referral">
          Referral
        </option>
      </select>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="border p-3 rounded"
      >
        <option value="latest">
          Latest
        </option>

        <option value="oldest">
          Oldest
        </option>
      </select>
    </div>
  );
};

export default LeadFilters;
import { useState } from "react";

import api from "../services/api";

import toast from "react-hot-toast";

import type { Lead } from "../types/lead";

interface Props {
  lead: Lead;
  fetchLeads: () => void;
}

const EditLeadModal = ({
  lead,
  fetchLeads,
}: Props) => {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(
        `/leads/${lead._id}`,
        formData
      );

      toast.success("Lead updated");

      fetchLeads();

      setOpen(false);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Edit Lead
            </h2>

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
                <option value="New">
                  New
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Qualified">
                  Qualified
                </option>

                <option value="Lost">
                  Lost
                </option>
              </select>

              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              >
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

              <div className="flex gap-4">
                <button
                  disabled={loading}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  {loading
                    ? "Updating..."
                    : "Update"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditLeadModal;
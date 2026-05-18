import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

interface Props {
  fetchLeads: () => void;
}

const LeadForm = ({ fetchLeads }: Props) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
    source: "Website",
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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/leads", formData);

      toast.success("Lead created");

      setFormData({
        name: "",
        email: "",
        status: "New",
        source: "Website",
      });

      fetchLeads();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        Create Lead
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded"
        >
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
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="border p-3 rounded"
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

        <button
          disabled={loading}
          className="bg-black text-white py-3 rounded md:col-span-2"
        >
          {loading
            ? "Creating..."
            : "Create Lead"}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
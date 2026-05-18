import type { Lead } from "../types/lead";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import EditLeadModal from "./EditLeadModal";

interface Props {
    leads: Lead[];
    fetchLeads: () => void;
}

const LeadsTable = ({
    leads,
    fetchLeads,
}: Props) => {
    const { user } = useAuth();

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/leads/${id}`);

            toast.success("Lead deleted");

            fetchLeads();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    if (leads.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow text-center">
                No leads found
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">
                            Name
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            Source
                        </th>

                        <th className="p-4 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {leads.map((lead) => (
                        <tr
                            key={lead._id}
                            className="border-t"
                        >
                            <td className="p-4">
                                {lead.name}
                            </td>

                            <td className="p-4">
                                {lead.email}
                            </td>

                            <td className="p-4">
                                {lead.status}
                            </td>

                            <td className="p-4">
                                {lead.source}
                            </td>

                            <td className="p-4 flex gap-2">
                                <EditLeadModal
                                    lead={lead}
                                    fetchLeads={fetchLeads}
                                />

                                {user?.role === "admin" && (
                                    <button
                                        onClick={() =>
                                            handleDelete(lead._id)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeadsTable;
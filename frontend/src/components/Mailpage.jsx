import { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [emails, setemails] = useState([]);
  const [loading, setloading] = useState(true);
  const [expandedId, setexpandedId] = useState(null); // track which email is expanded

  useEffect(() => {//execute when component load
    const fetchhistory = async () => {
      try {
        const token = localStorage.getItem("token");  //get login token

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/emails`,
          {
            headers: {
              Authorization: `Bearer ${token}`   //send jwt token for protected route
            }
          }
        );

        setemails(response.data.emails);   //save received history from backend
      } catch (error) {
        console.log("History error:", error);
      }

      setloading(false);   //loading complete
    };

    fetchhistory();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F5FAFB] px-4 py-10">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#D5E9ED] bg-white p-6 shadow-xl">
          <p className="text-sm text-[#277485]">
            Loading history...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F5FAFB] px-4 py-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#277485]">
            ARCHIVE
          </p>

          <div className="mt-2 flex items-center justify-between">
            <h2 className="text-4xl font-bold text-[#163F49]">
              Email history
            </h2>

            <button
              onClick={() => alert("Clear history - implement with backend confirmation")}
              className="text-sm font-medium text-[#277485] transition hover:text-[#1B5260]"
            >
              Clear all history
            </button>
          </div>
        </div>

        {/* Empty State */}
        {emails.length === 0 ? (
          <div className="rounded-2xl border border-[#D5E9ED] bg-white p-12 text-center shadow-lg">
            <p className="text-base text-[#5F7F87]">
              No email history found.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {emails.map((email) => (
              <div
                key={email._id}
                className="overflow-hidden rounded-2xl border border-[#D5E9ED] bg-white shadow-lg transition hover:shadow-xl"
              >

                {/* Summary - Always Visible */}
                <button
                  onClick={() =>
                    setexpandedId(
                      expandedId === email._id ? null : email._id
                    )
                  }
                  className="w-full px-6 py-4 text-left transition hover:bg-[#F0F8FA]"
                >
                  <div className="flex items-start justify-between">

                    <div className="flex-1">
                      <h3 className="font-semibold text-[#163F49]">
                        {email.subject}
                      </h3>

                      <p className="mt-1 text-xs text-[#6B858C]">
                        {new Date(email.sentAt).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`ml-4 inline-block rounded-lg px-3 py-2 text-xs font-semibold ${
                        email.status === "success"
                          ? "bg-[#E8F3F5] text-[#277485]"
                          : "bg-[#FDECEC] text-[#B23A48]"
                      }`}
                    >
                      {email.status === "success" ? "Success" : "Failed"}
                    </span>

                  </div>
                </button>

                {/* Expanded Details */}
                {expandedId === email._id && (
                  <div className="border-t border-[#D5E9ED] bg-[#F5FAFB] px-6 py-4">

                    {/* Message */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#277485]">
                        Message
                      </p>

                      <p className="mt-2 whitespace-pre-wrap rounded-lg border border-[#D5E9ED] bg-white p-3 text-sm leading-6 text-[#365963]">
                        {email.body}
                      </p>
                    </div>

                    {/* Recipients */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#277485]">
                        Recipients Status
                      </p>

                      <p className="mt-2 rounded-lg border border-[#D5E9ED] bg-white p-3 text-sm text-[#365963]">
                        {email.recipients && email.recipients.length > 0
                          ? email.recipients.join(",")
                          : "No recipients"}
                      </p>
                    </div>

                    {/* Clear Button */}
                    <button
                      onClick={() =>
                        alert("Delete individual email - implement with backend")
                      }
                      className="mt-4 text-sm font-medium text-[#B23A48] transition hover:text-[#8F2936]"
                    >
                      Clear
                    </button>

                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default History;
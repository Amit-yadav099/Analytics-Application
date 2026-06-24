import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiActivity, FiArrowRight } from "react-icons/fi";

import { getSessions } from "../api";

function SessionsList() {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await getSessions();
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) =>
      session.sessionId
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [sessions, search]);

  const totalEvents = sessions.reduce(
    (sum, session) => sum + session.eventCount,
    0
  );

  if (loading) {
    return (
      <div className="text-slate-400">
        Loading sessions...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">
          Sessions
        </h2>

        <p className="text-slate-400 mt-2">
          Explore user sessions and journeys
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Total Sessions
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {sessions.length}
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Total Events
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {totalEvents}
          </h3>
        </div>

      </div>

      {/* Search */}
      <div className="relative max-w-md">

        <FiSearch
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          type="text"
          placeholder="Search session..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            bg-slate-900
            border
            border-slate-800
            rounded-lg
            pl-10
            pr-4
            py-3
            outline-none
            focus:border-blue-500
          "
        />

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>
              <th className="text-left p-4">
                Session ID
              </th>

              <th className="text-left p-4">
                Events
              </th>

              <th className="text-right p-4">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {filteredSessions.map((session) => (
              <tr
                key={session.sessionId}
                className="
                  border-t
                  border-slate-800
                  hover:bg-slate-800/50
                  transition
                "
              >
                <td className="p-4">

                  <div className="font-medium">
                    {session.sessionId}
                  </div>

                </td>

                <td className="p-4">

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-3
                      py-1
                      rounded-full
                      bg-blue-500/20
                      text-blue-400
                    "
                  >
                    <FiActivity />
                    {session.eventCount}
                  </span>

                </td>

                <td className="p-4 text-right">

                  <Link
                    to={`/session/${session.sessionId}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      bg-blue-600
                      hover:bg-blue-700
                      px-4
                      py-2
                      rounded-lg
                      transition
                    "
                  >
                    View

                    <FiArrowRight />
                  </Link>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center">

          <p className="text-slate-500">
            No matching sessions found.
          </p>

        </div>
      )}

    </div>
  );
}

export default SessionsList;
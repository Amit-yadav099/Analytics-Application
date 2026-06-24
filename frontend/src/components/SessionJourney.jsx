import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

import {
  FiArrowLeft,
  FiMousePointer,
  FiEye,
  FiClock
} from "react-icons/fi";

import { getSessionEvents } from "../api";

function SessionJourney() {
  const { sessionId } = useParams();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getSessionEvents(sessionId);
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="text-slate-400">
        Loading session journey...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            Session Journey
          </h2>

          <p className="text-slate-400 mt-2 break-all">
            {sessionId}
          </p>
        </div>

        <Link
          to="/"
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            bg-slate-800
            hover:bg-slate-700
          "
        >
          <FiArrowLeft />
          Back
        </Link>

      </div>

      {/* Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

        <p className="text-slate-400">
          Total Events
        </p>

        <h3 className="text-4xl font-bold mt-2">
          {events.length}
        </h3>

      </div>

      {/* Timeline */}
      <div className="space-y-4">

        {events.map((event, index) => (
          <div
            key={index}
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-xl
              p-5
            "
          >
            <div className="flex items-start gap-4">

              {/* Event Icon */}
              <div className="mt-1">

                {event.eventType === "page_view" ? (
                  <FiEye className="text-blue-400 text-xl" />
                ) : (
                  <FiMousePointer className="text-red-400 text-xl" />
                )}

              </div>

              {/* Event Content */}
              <div className="flex-1">

                <div className="flex items-center gap-2">

                  <span className="font-semibold capitalize">
                    {event.eventType.replace("_", " ")}
                  </span>

                  <span
                    className={`
                      text-xs
                      px-2
                      py-1
                      rounded-full
                      ${
                        event.eventType === "page_view"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                  >
                    {event.eventType}
                  </span>

                </div>

                <p className="text-slate-400 mt-2 break-all">
                  {event.pageUrl}
                </p>

                {event.eventType === "click" && (
                  <p className="text-slate-300 mt-2">
                    Coordinates:
                    {" "}
                    ({event.x}, {event.y})
                  </p>
                )}

                <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">

                  <FiClock />

                  {event.timestamp &&
                    format(
                      new Date(event.timestamp),
                      "dd MMM yyyy, HH:mm:ss"
                    )}

                </div>

              </div>

            </div>
          </div>
        ))}

      </div>

      {events.length === 0 && (
        <div className="bg-slate-900 rounded-xl p-8 text-center text-slate-500">
          No events found for this session.
        </div>
      )}

    </div>
  );
}

export default SessionJourney;
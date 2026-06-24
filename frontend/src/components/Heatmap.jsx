import React, { useState } from "react";
import { FiMap, FiMousePointer } from "react-icons/fi";
import { getHeatmap } from "../api";

function Heatmap() {
  const [pageUrl, setPageUrl] = useState("");
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!pageUrl.trim()) return;

    try {
      setLoading(true);

      const res = await getHeatmap(pageUrl);

      setClicks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <FiMap />
          Heatmap Analytics
        </h2>

        <p className="text-slate-400 mt-2">
          Visualize click activity for a page
        </p>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">

        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="text"
            placeholder="Enter page URL"
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
            className="
              flex-1
              bg-slate-950
              border
              border-slate-700
              rounded-lg
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />

          <button
            onClick={handleFetch}
            className="
              bg-blue-600
              hover:bg-blue-700
              px-6
              py-3
              rounded-lg
              font-medium
            "
          >
            {loading ? "Loading..." : "Load Heatmap"}
          </button>

        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">Total Clicks</p>

          <h3 className="text-3xl font-bold mt-2">
            {clicks.length}
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Click Events
          </p>

          <h3 className="text-3xl font-bold mt-2 flex items-center gap-2">
            <FiMousePointer />
            {clicks.length}
          </h3>
        </div>

      </div>

      {/* Heatmap Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">

        <div
          className="
            relative
            w-full
            h-[600px]
            bg-slate-950
            rounded-lg
            overflow-hidden
          "
        >

          {clicks.length === 0 && !loading && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-500">
              No click data available
            </div>
          )}

          {clicks.map((c, idx) => (
            <div
              key={idx}
              className="
                absolute
                w-5
                h-5
                bg-red-500
                rounded-full
                opacity-40
                blur-[1px]
              "
              style={{
                left: c.x,
                top: c.y,
                transform: "translate(-50%, -50%)",
              }}
              title={`(${c.x}, ${c.y})`}
            />
          ))}

        </div>
      </div>

    </div>
  );
}

export default Heatmap;
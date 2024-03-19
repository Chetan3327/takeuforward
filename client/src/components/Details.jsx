import React from "react";

const Details = ({ outputDetails }) => {
  return (
    <div className="metrics-container flex space-x-3 p-1.5">
      <p className="text-sm">
        Status:{" "}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{" "}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{" "}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default Details;
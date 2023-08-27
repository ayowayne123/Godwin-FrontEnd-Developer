import React from "react";

const CapsulePopup = ({ capsule, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white flex p-4  w-96 h-80 lg:w-[500px]  lg:h-[380px] border-4 rounded-xl ${
          capsule.status === "unknown" && " border-blue-300 "
        }
            ${capsule.status === "active" && " border-green-300"} ${
          capsule.status === "destroyed" && " border-yellow-300 "
        } ${capsule.status === "retired" && " border-red-300 t"} `}
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-lg lg:text-2xl font-semibold mb-2">
            {capsule.serial}
          </h2>
          <h3 className="text-base font-medium mb-2">{capsule?.last_update}</h3>
          <p>Type: {capsule.type}</p>
          <p>
            Has Ever Launched: {capsule.launches.length > 0 ? "Yes" : "No"}{" "}
          </p>
          <p>Water Landings: {capsule.water_landings}</p>
          <p>Land Landings: {capsule.land_landings}</p>
          <p>
            Status:{" "}
            <span
              className={`uppercase rounded-full py-2 px-4  ${
                capsule.status === "unknown" && "  bg-blue-300 text-blue-600"
              }
            ${capsule.status === "active" && "  bg-green-300 text-green-600"} ${
                capsule.status === "destroyed" &&
                "  bg-yellow-300 text-yellow-600"
              } ${
                capsule.status === "retired" && "  bg-red-300 text-red-600"
              } `}
            >
              {" "}
              {capsule.status}
            </span>
          </p>

          <button
            onClick={onClose}
            className="items-center bg-red-600 p-4 rounded-lg text-white w-28 h-10 flex justify-center  "
          >
            Close X
          </button>
        </div>
      </div>
    </div>
  );
};

export default CapsulePopup;

import React from "react";

const Card = ({ dt }) => {
  return (
    <div className="card p-[10px] bg-base-100 shadow-lg hover:shadow-cyan-900 card-div ">
      <figure>
        <img
          src={dt.background_image}
          alt="game"
          className="h-32 lg:h-44 w-full object-cover object-center  ease-in-out duration-500"
        />
      </figure>
      <div className="card-body p-3">
        <div className="card-actions justify-start mb-1">
          {dt.genres?.slice(0, 2).map((genre) => (
            <div className="badge badge-outline text-xs" key={genre.id}>
              {genre.name}
            </div>
          ))}
        </div>
        <h2 className="card-title">
          <span className="w-max truncate">{dt.name}</span>
          {dt.metacritic > 80 && (
            <div className="badge badge-info text-xs ">Hot</div>
          )}
        </h2>
        <div className="card-actions justify-end mb-1">
          <button className="btn underline btn-ghost hover:shadow-lg sm:shadow-cyan-900 ">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

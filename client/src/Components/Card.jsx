import React from "react";
import card_skeleton from "../assets/card_skeleton.png";
const Card = ({ dt }) => {
  return (
    <a className="group card p-[10px] h-[340px] lg:w-[350px] shadow-lg   rounded-none">
      <figure>
        <img
          src={dt.background_image || card_skeleton}
          alt="game"
          className="h-32 lg:h-44 w-full object-cover object-center group-hover:brightness-[1.15]  ease-in-out duration-500"
        />
      </figure>
      <div className="card-body p-3 bg-transparent">
        <div className="card-actions justify-start mb-1">
          {dt.genres?.slice(0, 2).map((genre) => (
            <div className="badge badge-outline text-xs" key={genre.id}>
              {genre.name}
            </div>
          ))}
        </div>
        <h2 className="card-title">
          <span className="w-max truncate">{dt.name}</span>
          {/* {dt.metacritic > 80 && (
            <div className="badge badge-info text-xs ">Hot</div>
          )} */}
        </h2>
        <div className="card-actions justify-end mb-1">
          <button className="btn underline btn-ghost hover:shadow-lg sm:shadow-cyan-900 ">
            View More
          </button>
        </div>
      </div>
    </a>
  );
};

export default Card;

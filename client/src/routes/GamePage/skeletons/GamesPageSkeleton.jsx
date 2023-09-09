import React from "react";
import PageWrapper from "../../../utils/PageWrapper";

function GamesPageSkeleton() {
  return (
    <PageWrapper>
      <div className="flex flex-col gap-3 ">
        <section className="">
          <div className="h-6 w-1/4 lg:w-1/6 bg-gray-load1 animate-pulse rounded-s"></div>
        </section>
        <section className="relative flex px-4 items-center">
          <div className="lg:block h-72 w-2/3 bg-gray-load1 animate-pulse hidden relative rounded-s"></div>
          <div className="lg:block h-80 w-2/3 bg-gray-load1 animate-pulse relative hidden rounded-s"></div>
          <div className="lg:h-96 h-72 w-full bg-gray-load1 animate-pulse relative rounded-s"></div>
          <div className="lg:block h-80 w-2/3 bg-gray-load1 animate-pulse relative hidden rounded-s"></div>
          <div className="lg:block h-72 w-2/3 bg-gray-load1 animate-pulse hidden relative rounded-s"></div>
        </section>
        <section>
          <div className="h-6 lg:w-1/6 w-1/4 bg-gray-load1 animate-pulse rounded-s"></div>
        </section>
        <section className="w-full">
          <div class="grid grid-cols-3 lg:grid-cols-5 place-content-between-center gap-x-4 w-full">
            <div class="bg-gray-load1 h-48 text-white text-center p-4 lg:block hidden animate-pulse rounded-s"></div>
            <div class="bg-gray-load1 h-48 text-white text-center p-4 animate-pulse rounded-s"></div>
            <div class="bg-gray-load1 h-48 text-white text-center p-4 animate-pulse rounded-s"></div>
            <div class="bg-gray-load1 h-48 text-white text-center p-4 animate-pulse rounded-s"></div>
            <div class="bg-gray-load1 h-48 text-white text-center p-4 lg:block hidden animate-pulse rounded-s"></div>
          </div>
        </section>
        <section>
          <div className="h-6 lg:w-1/6 w-1/4 bg-gray-load1 animate-pulse rounded-s"></div>
        </section>
        <section className="w-full">
          <div class="grid grid-cols-3 lg:grid-cols-5 place-content-between-center gap-x-4 w-full">
            <div class="bg-gray-load1 h-48 text-white text-center p-4 lg:block hidden animate-pulse rounded-s"></div>
            <div class="bg-gray-load1 h-48 text-white text-center p-4 animate-pulse rounded-s"></div>
            <div class="bg-gray-load1 h-48 text-white text-center p-4 animate-pulse rounded-s"></div>
            <div class="bg-gray-load1 h-48 text-white text-center p-4 animate-pulse rounded-s"></div>
            <div class="bg-gray-load1 h-48 text-white text-center p-4 lg:block hidden animate-pulse rounded-s"></div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

export default GamesPageSkeleton;

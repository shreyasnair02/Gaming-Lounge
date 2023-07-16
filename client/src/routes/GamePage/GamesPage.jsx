import React, { useEffect, useState } from "react";
import { useGet } from "../../hooks/rawgQueries/rawg-queries";
import PageWrapper from "../../utils/PageWrapper";
import Card from "../../Components/Card";
import SearchInput from "../../Components/SearchInput";
import Loading from "../../utils/Loading";
import HeroCarousel from "../../Components/Carousel/HeroCarousel";
import SliderCarousel from "../../Components/Carousel/SliderCarousel";

const rawg_api = import.meta.env.VITE_RAWG_KEY;

const GamesPage = () => {
  const latest = useGet(["-rating"]);
  const bestSelling = useGet(["-metacritic"]);
  const mostPlayed = useGet([]);
  const newTitles = useGet(["-released"]);
  const newlyReleased = useGet(["new"]);

  let arr = [];
  if (latest?.data) {
    arr = latest.data.results.map((dt) => ({
      id: dt.id,
      cover: dt.background_image,
      title: dt.name,
      platforms: dt.parent_platforms,
    }));
  }
  return (
    <PageWrapper>
      <main className="min-h-[50vh]">
        Trending
        {latest.data && <HeroCarousel arr={arr} />}
      </main>
      best selling
      <main className=" min-h-[50vh]">
        {bestSelling.data && (
          <SliderCarousel arrayItems={bestSelling.data.results} />
        )}
      </main>
      <main>
        Most played
        {mostPlayed.data && (
          <SliderCarousel arrayItems={mostPlayed.data.results} />
        )}
      </main>
      <main>
        Newly released
        {newlyReleased.data && (
          <SliderCarousel arrayItems={newlyReleased.data.results} />
        )}
        {console.log(newlyReleased.data)}
      </main>
      <main>
        Upcoming games
        {newTitles.data && (
          <SliderCarousel arrayItems={newTitles.data.results} />
        )}
        {console.log(newTitles.data)}
      </main>
    </PageWrapper>
  );
};

export default GamesPage;

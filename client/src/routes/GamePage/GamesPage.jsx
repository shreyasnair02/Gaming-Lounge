import React from "react";
import { useGet } from "../../hooks/rawgQueries/rawg-queries";
import PageWrapper from "../../utils/PageWrapper";
import HeroCarousel from "../../Components/Carousel/HeroCarousel";
import SliderCarousel from "../../Components/Carousel/SliderCarousel";
import GamesPageSkeleton from "./skeletons/GamesPageSkeleton";

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
  if (
    latest.isLoading ||
    bestSelling.isLoading ||
    newTitles.isLoading ||
    newlyReleased.isLoading ||
    bestSelling.isLoading ||
    mostPlayed.isLoading
  )
    return <GamesPageSkeleton />;
  return (
    <PageWrapper>
      <main className="min-h-[50vh]">
        <h2 className="text-lg uppercase font-bold">Trending</h2>
        {latest.data && <HeroCarousel arr={arr} />}
      </main>
      <h2 className="text-lg uppercase font-bold">best selling</h2>
      <main className=" min-h-[50vh]">
        {bestSelling.data && (
          <SliderCarousel arrayItems={bestSelling.data.results} />
        )}
      </main>
      <main>
        <h2 className="text-lg uppercase font-bold">Most played</h2>
        {mostPlayed.data && (
          <SliderCarousel arrayItems={mostPlayed.data.results} />
        )}
      </main>
      <main>
        <h2 className="text-lg uppercase font-bold">Newly released</h2>
        {newlyReleased.data && (
          <SliderCarousel arrayItems={newlyReleased.data.results} />
        )}
      </main>
      <main>
        <h2 className="text-lg uppercase font-bold">Upcoming games</h2>
        {newTitles.data && (
          <SliderCarousel arrayItems={newTitles.data.results} />
        )}
      </main>
    </PageWrapper>
  );
};

export default GamesPage;

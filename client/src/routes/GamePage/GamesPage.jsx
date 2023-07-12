import React, { useEffect, useState } from "react";
import { useGet } from "../../utils/react-query";
import PageWrapper from "../../utils/PageWrapper";
import Card from "../../Components/Card";
import SearchInput from "../../Components/SearchInput";
import Loading from "../../utils/Loading";
import ResponsiveCarousel from "../../Components/ResponsiveCarousel";

const rawg_api = import.meta.env.VITE_RAWG_KEY;
const GamesPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState(null);
  let arr = [];
  const { data, isLoading } = useGet();
  if (data) {
    arr = data.results.map((dt) => ({
      id: dt.id,
      cover: dt.background_image,
      title: dt.name,
      platforms: dt.parent_platforms,
    }));
  }
  return (
    <PageWrapper>
      <main className="min-h-[50vh]">
        {data && <ResponsiveCarousel arr={arr} />}
      </main>
    </PageWrapper>
  );
};

export default GamesPage;

import React, { useEffect, useState } from "react";
import PageWrapper from "../../utils/PageWrapper";
import Card from "../../Components/Card";
import SearchInput from "../../Components/SearchInput";
import Loading from "../../utils/Loading";
const GamesPage = () => {
  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (searchInput === "") {
        setSearchData(null);
        return;
      }
      fetch(``)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.results);
          setSearchData(data);
        });
    }, 350);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [searchInput]);
  return (
    <PageWrapper>
      <div className="w-full flex justify-center mb-6">
        <SearchInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchData={searchData}
        />
      </div>
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-y-2 p-6 lg:p-20 ">
        {/* {data ? (
          data.results.map((dt) => <Card dt={dt} key={dt.id} />)
        ) : (
          <Loading />
        )} */}
        {data?.results.map((dt) => <Card dt={dt} key={dt.id} />) || <Loading />}
      </main>
    </PageWrapper>
  );
};

export default GamesPage;

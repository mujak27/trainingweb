import React from "react";

type props={
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
};

export const AnimeSearch:React.FC<props> = ({search, setSearch}) => {

  return (
    <>
      <input type='text' value={search} onChange={e=>setSearch(e.currentTarget.value)} />
    </>
  )
}


import { Typography, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFetch } from "../hook";
import AniCard from "./AniCard"

const SubsPage = () => {
  const { data, status } = useFetch(
    "https://api.jikan.moe/v3/season"
    // "http://localhost:3001/?q=Heion"
    // "https://nyaasi-api.herokuapp.com/?q=lovelive&category=1"
    // "/api/greeting?name=good}"
  );
  const localSubs = JSON.parse(localStorage.getItem("subscription"))
  const [subs, setSubs] = useState(localSubs ? localSubs : [])
  // const [subs, setSubs] = useState([]);

  useEffect(() => {
    localStorage.setItem("subscription", JSON.stringify(subs))
  });

  if (status === "fetching") {
    return <Typography>Loading...</Typography>;
  };

  const updateSubs = (mal_id) => {
    // setSubs(mal_id in Object.keys(subs) ? removeSubs(subs, mal_id) : Object.assign(subs, { mal_id: undefined }))
    if (subs.some(sub => sub.id === mal_id)) {
      setSubs(subs.filter((sub) => sub.id !== mal_id))
    } else {
      setSubs([...subs, { id: mal_id, lastUpdate: "undefined" }])
    }
  }


  // const removeSubs = (subs, removed_id) => {
  //   const { [removed_id]: _, ...rest } = subs;
  //   return { ...rest };
  // }

  return (
    <>
      <Typography variant="h3"> Welcome to subsciption! </Typography>
      < pre > {JSON.stringify(subs, undefined, 2)} </pre>
      < pre > {data && data.season_year},{data && data.season_name} </pre>
      <Grid container spacing={2}>
        {data &&
          data.anime.map((anime) => (
            <Grid item key={anime.mal_id} xs={2}>
              <AniCard {...anime} updateSubs={updateSubs} />
            </Grid>
          ))}
      </Grid>
      < pre >
        {/* {JSON.stringify(data.anime[0].title, undefined, 2)} */}
        {data && data.anime.map((item) =>
          JSON.stringify(item, undefined, 2))}
      </pre>
      {console.log("load")}
    </>
  );
};


export default SubsPage;
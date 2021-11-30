import { Typography, Grid, Button, Badge, Checkbox } from "@material-ui/core";
import { compose, spacing, palette } from "@material-ui/system";
// import CheckIcon from '@material-ui/icons/Check';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { useFetch } from "../hook";
import AniCard from "./AniCard"
import styleFunctionSx from "@mui/system/styleFunctionSx";
import { styled } from "@mui/system"

const SubsPage = () => {
  const localSubs = localStorage.getItem("subscription")
  // const [subs, setSubs] = useState([])
  const [subs, setSubs] = useState(localSubs ? JSON.parse(localSubs) : { "monday": [], "tuesday": [], "wednesday": [], "thursday": [], "friday": [], "saturday": [], "sunday": [], "other": [], "unknown": [] })
  // const [subs, setSubs] = useState([]);

  useEffect(() => {
    // console.log(subs);
    localStorage.setItem("subscription", JSON.stringify(subs))
  }, [subs]);

  const { data, status } = useFetch(
    "https://api.jikan.moe/v3/schedule"
    // "http://localhost:3001/?q=Heion"
    // "https://nyaasi-api.herokuapp.com/?q=lovelive&category=1"
    // "/api/greeting?name=good}"
  );

  const { request_hash, request_cached, request_cache_expiry, ...days } = data || {};

  if (status === "fetching") {
    return <Typography>Loading...</Typography>;
  };

  const updateSubs = (day, mal_id, title) => {
    // setSubs(mal_id in Object.keys(subs) ? removeSubs(subs, mal_id) : Object.assign(subs, { mal_id: undefined }))
    if (subs[day].some(sub => sub.mal_id === mal_id)) {
      subs[day] = subs[day].filter((sub) => sub.mal_id !== mal_id);
      setSubs({ ...subs });
    } else {
      console.log("Add", day, mal_id, title)
      // setSubs([...subs, days[day].find((anime) => anime.mal_id === mal_id)])
      subs[day].push(days[day].find((anime) => anime.mal_id === mal_id));
      setSubs({ ...subs });
    }
    console.log("after: ", subs)
  }

  // const removeSubs = (subs, removed_id) => {
  //   const { [removed_id]: _, ...rest } = subs;
  //   return { ...rest };
  // }

  const styleFunction = styleFunctionSx(compose(spacing, palette));
  const sxBadge = styled(Badge)(styleFunction);

  return (
    <>
      <Typography variant="h3" sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 300,
      }}> Welcome to subsciption! </Typography>
      <Button variant="contained" disableElevation href="/tracking">Go to tracker</Button>
      {/* < pre > {JSON.stringify(subs, undefined, 2)} </pre> */}
      {/* {
        data &&
        <Grid item key={anime.mal_id} xs={2}>
        {data.monday.map((anime) => (
         
            <AniCard {...anime} click={updateSubs} />
          </Grid>
        ))}
      } */}
      {/* <Grid container spacing={2}> */}

      {days && Object.entries(days).map((day) => (
        <>< Typography variant="h6" > {day[0]} </Typography>
          {/* {JSON.stringify(day[1], undefined, 2)} */}
          <Grid container spacing={1} rowSpacing={1} columnSpacing={{ xs: 0, sm: 1 }} >
            {day[1].map((anime) => (
              <Grid item key={anime.mal_id} xs={2}  >
                <sxBadge sx={{
                  // '& .MuiBadge-root': { display: 'block', },
                  width: 1,
                }} badgeContent={<Checkbox onChange={updateSubs} />} >
                  <AniCard {...anime} day={day[0]} click={updateSubs} />
                </sxBadge>
              </Grid>
              // {/* {JSON.stringify(anime, undefined, 2)} */}
            ))}
          </Grid>
        </>
        // day[1].map((anime) => (
        //   <Grid item key={anime.mal_id} xs={2}>
        //     <AniCard {...anime} click={updateSubs} />
        //     {/* {JSON.stringify(anime, undefined, 2)} */}
        //   </Grid>

        // ))
        // <Grid>{JSON.stringify(day, undefined, 2)}</Grid>
      ))}

      {/* )
        )
          data.monday.map((anime) => (
          <Grid item key={anime.mal_id} xs={2}>
            <AniCard {...anime} click={updateSubs} />
          </Grid>
        ))}
      </Grid> */}
      < pre >
        {JSON.stringify(days, undefined, 2)}
        {/* {data && data.anime.map((item) =>
          JSON.stringify(item, undefined, 2))} */}
      </pre>
      {/* {console.log(days)} */}
    </>
  );
};


export default SubsPage;
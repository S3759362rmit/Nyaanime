import { Typography, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFetch } from "../hook";
import AniCard from "./AniCard"
// import { si } from "../Nyaapi/src/index.js";
import { si } from "nyaapi";

const App = () => {


    const localSubs = JSON.parse(localStorage.getItem("subscription"))
    const [filter, setFilter] = useState("0")
    const [category, setCategory] = useState("1_0")
    // const [subs, setSubs] = useState([])
    // const [subs, setSubs] = useState(localSubs ? JSON.parse(localSubs) : [])

    // if (status === "fetching") {
    //     return <Typography>Loading...</Typography>;
    // }
    // const { si } = require("../Nyaapi/src/index.js")
    // console.log(si.config.url)
    // si.config.updateBaseUrl('https://nyaa.kr')

    // change baseURL to proxy server
    si.cli.defaults.baseURL = 'http://localhost:3001'
    const search = (mal_id, title) => {
        si.search(title, 20).then((data) => console.log(data)).catch((err) => console.log(err));
    }

    return (
        <>
            <Typography variant="h3">Welcome to tracker!</Typography>
            {localSubs && Object.entries(localSubs).map((day) => (
                <>< Typography variant="h6" > {day[0]} </Typography>
                    <Grid container spacing={2}>
                        {day[1].map((anime) => (
                            <Grid item key={anime.mal_id} xs={2}>
                                <AniCard {...anime} day={day[0]} click={search} />
                            </Grid>
                            // {/* {JSON.stringify(anime, undefined, 2)} */}
                        ))}
                    </Grid>
                </>
            ))}

        </>
    );
}


export default App;
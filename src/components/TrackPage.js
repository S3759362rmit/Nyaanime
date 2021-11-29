import { Typography, Grid, Button } from "@material-ui/core";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFetch } from "../hook";
import AniCard from "./AniCard"
// import { si } from "../Nyaapi/src/index.js";
import { pantsu } from "nyaapi";

const App = () => {


    const localSubs = localStorage.getItem("subscription");
    const subs = localSubs ? JSON.parse(localSubs) : { "monday": [], "tuesday": [], "wednesday": [], "thursday": [], "friday": [], "saturday": [], "sunday": [], "other": [], "unknown": [] };

    const [filter, setFilter] = useState("0")
    const [category, setCategory] = useState("1_0")
    const [torrents, setTorrents] = useState({})

    useEffect(() => {
        console.log(subs);
        Object.values(subs)?.flat().map((anime) => {
            search(anime.title).then((data) => { setTorrents({ ...torrents, anime: data }) });
            console.log("serching ", anime.title)
        });
    }, []);
    // const [subs, setSubs] = useState([])
    // const [subs, setSubs] = useState(subs ? JSON.parse(subs) : [])

    // if (status === "fetching") {
    //     return <Typography>Loading...</Typography>;
    // }
    // const { si } = require("../Nyaapi/src/index.js")
    // console.log(si.config.url)
    // si.config.updateBaseUrl('https://nyaa.kr')

    // change baseURL to proxy server
    pantsu.cli.defaults.baseURL = 'http://localhost:3001'
    const search = (title) => {
        // return si.search(title, 20, { filter: filter, category: category }).then((data) => { return data }).catch((err) => console.log(err));
        // si version
        // return si.search(title, 20, { filter: filter, category: category }).catch((err) => console.log(err));
        return pantsu.search(title, 20, { order: true, sort: '4' }).catch((err) => console.log(err));
    }

    return (
        <>
            {/* {JSON.stringify(anime, undefined, 2)} */}
            <Typography variant="h3">Welcome to tracker!</Typography>
            <Button variant="contained" disableElevation href="subsciption">Go to subscription</Button>
            <FormControl >
                <InputLabel id="filter-select-label">Filter</InputLabel>
                <Select
                    labelId="filter-select-label"
                    id="filter-select"
                    value={filter}
                    label="Filter"
                    onChange={(event) => setFilter(event.target.value)}
                >
                    <MenuItem value={0}>No filter</MenuItem>
                    <MenuItem value={1}>No remakes</MenuItem>
                    <MenuItem value={2}>Trusted only</MenuItem>
                </Select>
            </FormControl>
            <FormControl >
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={category}
                    label="Category"
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <MenuItem value={"1_0"}>Anime</MenuItem>
                    <MenuItem value={"1_2"} >- English-translated</MenuItem>
                    <MenuItem value={"1_3"} >- Non-English-translated</MenuItem>
                    <MenuItem value={"1_4"} >- Raw</MenuItem>
                </Select>
            </FormControl>

            {subs && Object.entries(subs).map((day) => (
                <>< Typography variant="h6" > {day[0]} </Typography>
                    <Grid container spacing={1}>
                        {day[1].map((anime) => (
                            <Grid container spacing={0}>
                                <Grid item key={anime.mal_id} xs={2}>
                                    <AniCard {...anime} day={day[0]} click={search} />
                                </Grid>

                                <Grid item key={anime.mal_id} xs={10}>
                                    <TableContainer component={Paper}>
                                        <Table size="small" aria-label="torrent-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">Size</TableCell>
                                                    <TableCell align="right">Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {torrents[anime]?.map((torrent) => (
                                                    <TableRow
                                                        key={torrent.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {torrent.name}
                                                        </TableCell>
                                                        <TableCell align="right">{torrent.filesize}</TableCell>
                                                        <TableCell align="right">{torrent.date}</TableCell>
                                                    </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>

                                {/* <Grid item key={anime.mal_id} xs={10}>
                                    <TableContainer component={Paper}>
                                        <Table size="small" aria-label="torrent-table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">Size</TableCell>
                                                    <TableCell align="right">Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {map((torrent) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                        <TableCell align="right">{row.protein}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid> */}
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
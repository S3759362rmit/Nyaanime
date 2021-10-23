import { Typography, Grid } from "@material-ui/core";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useFetch } from "../hook";
import AniCard from "./AniCard"
// import { si } from "../Nyaapi/src/index.js";
import { si } from "nyaapi";

const App = () => {


    const localSubs = JSON.parse(localStorage.getItem("subscription"))
    const [filter, setFilter] = useState("0")
    const [category, setCategory] = useState("1_0")
    const [torrents, setTorrents] = useState([])
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
    const search = (title) => {
        // return si.search(title, 20, { filter: filter, category: category }).then((data) => { return data }).catch((err) => console.log(err));
        return si.search(title, 20, { filter: filter, category: category }).then((data) => { setTorrents(data) }).catch((err) => console.log(err));
    }

    return (
        <>
            <Typography variant="h3">Welcome to tracker!</Typography>
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

            {localSubs && Object.entries(localSubs).map((day) => (
                <>< Typography variant="h6" > {day[0]} </Typography>
                    <Grid container spacing={1}>
                        {day[1].map((anime) => {
                            search(anime.title);
                            return (
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
                                                    {/* {search(anime.title)} */}
                                                    {torrents?.map((torrent) => (
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
                            )
                        })}
                    </Grid>
                </>
            ))}

        </>
    );
}


export default App;
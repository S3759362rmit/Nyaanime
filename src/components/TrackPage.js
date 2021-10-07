import { Typography, Grid } from "@material-ui/core";
import { useFetch } from "../hook";

const App = () => {
    const { data, status } = useFetch(
        // "https://api.jikan.moe/v3/season"
        "http://localhost:3001/?q=Heion"
        // "https://nyaasi-api.herokuapp.com/?q=lovelive&category=1"
        // "/api/greeting?name=good}"
    );

    if (status === "fetching") {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Typography variant="h3">Welcome to tracker!</Typography>

            {/* <Grid container spacing={2}>
                {data &&
                    data.anime.map((anime) => (
                        <Grid item key={anime.title} xs={3}>
                            <AinCard {...anime} />
                        </Grid>
                    ))}
            </Grid> */}
            <pre>{JSON.stringify(data, undefined, 2)}</pre>
        </>

    );
}


export default App;
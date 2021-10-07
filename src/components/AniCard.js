import { Card, CardContent, CardMedia, Typography, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const AniCard = ({
    mal_id,
    url,
    title,
    image_url,
    synopsis,
    type,
    airing_start,
    episodes,
    updateSubs
}) => {
    const history = useHistory();

    return (
        // <Card onClick={() => history.push(`/${id}`)}>
        <Card >
            <CardMedia image={image_url} style={{ height: 200, width: 200 }} onClick={() => { updateSubs(mal_id) }}></CardMedia>
            <CardContent>
                <Tooltip title={title}>
                    <Typography noWrap variant="h6">
                        <a href={url} >
                            {title}
                        </a>
                    </Typography>
                </Tooltip>
            </CardContent>
        </Card>
    );
};

export default AniCard;

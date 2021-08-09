import * as React from "react";
import { styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Shadow } from "components/shadow";
import { Image } from "components/image";
import dayjs from "dayjs";
import { DATE_FORMATE } from "constants/index";
import { Text } from "components/text";
import { Box, Chip, Link, Rating, Tooltip } from "@material-ui/core";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ArticleItem({
  id,
  title,
  imgSrc,
  href,
  time,
  tags,
  uid,
  content,
  ratingCount,
  ratingScore,
  search,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {id}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link style={{ textDecoration: "none" }} target="_blank" href={href}>
            <Text limit={20}>{title}</Text>
          </Link>
        }
        subheader={dayjs(time).format(DATE_FORMATE)}
      />

      <Shadow
        overlay={
          <div style={{ padding: 8 }}>
            {tags.split("|").map((tag) => (
              <Chip
                onClick={() => search({ keyword: tag })}
                style={{ color: "white", margin: 4 }}
                variant="outlined"
                key={tag}
                label={tag}
              />
            ))}
          </div>
        }
      >
        <Image
          style={{
            width: "100%",
            height: 220,
            objectFit: "cover",
          }}
          src={imgSrc}
        />
      </Shadow>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <Tooltip title={ratingScore}>
          <IconButton style={{ color: red[300] }} aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Tooltip> */}

        <Tooltip title={ratingScore}>
          <IconButton>
            <Rating readOnly precision={0.1} value={ratingScore} />
          </IconButton>
        </Tooltip>
        <Box sx={{ ml: 2 }}>评分人数: {ratingCount}</Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {uid &&
            uid.split("|").map((u) => {
              return (
                <Text key={u} copy={true} wrap={false}>
                  {"magnet:?xt=urn:btih:" + u}
                </Text>
              );
            })}
        </CardContent>
      </Collapse>
    </Card>
  );
}

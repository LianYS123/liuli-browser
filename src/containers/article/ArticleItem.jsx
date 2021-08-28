import * as React from "react";
import { styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import dayjs from "dayjs";
import { DATE_FORMATE } from "constants/index";
import { Text } from "components/text";
import { Box, Chip, Divider, Link, Rating, Tooltip } from "@material-ui/core";

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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {id}
          </Avatar>
        }
        title={
          <Link style={{ textDecoration: "none" }} target="_blank" href={href}>
            <Text limit={20}>{title}</Text>
          </Link>
        }
        subheader={dayjs(time).format(DATE_FORMATE)}
      />

      <img
        style={{
          width: "100%",
          height: 220,
          objectFit: "cover",
        }}
        alt={title}
        src={imgSrc}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title={ratingScore}>
          <IconButton>
            <Rating readOnly precision={0.1} value={ratingScore} />
          </IconButton>
        </Tooltip>
        <Box sx={{ ml: 2 }}>评分人数: {ratingCount}</Box>
      </CardActions>
      <CardContent>
        <div style={{ marginBottom: 8 }}>
          {tags.split("|").map((tag) => (
            <Chip
              onClick={() => search({ keyword: tag })}
              style={{ margin: 4 }}
              variant="outlined"
              key={tag}
              label={tag}
            />
          ))}
        </div>
        {uid &&
          uid.split("|").map((u) => {
            return (
              <div key={u}>
                <Text copy={true} wrap={false}>
                  {"magnet:?xt=urn:btih:" + u}
                </Text>
                {/* <Divider /> */}
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}

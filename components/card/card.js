import {
  Card as MuiCard,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { getKrDate } from "../../controller/post";

export default function Card(props) {
  const { posts } = props;
  return (
    <Grid container spacing={2} component="section">
      {posts.length > 0 &&
        posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id} component="article">
            <MuiCard className="cardWrap">
              <CardContent className="cardBox">
                <Link href={`/posts/${post.id}`} passHref={true}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="cardTitle"
                  >
                    {post.title}
                  </Typography>
                </Link>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  className="cardContent"
                >
                  {post.content}
                </Typography>
                <div className="cardBottom">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="cardTime"
                  >
                    <time>{getKrDate(post.createdAt)}</time>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.tag.map((v) => (
                      <span className="tag" key={v}>
                        {v}
                      </span>
                    ))}
                  </Typography>
                </div>
              </CardContent>
            </MuiCard>
          </Grid>
        ))}
    </Grid>
  );
}

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Grid,
} from "@mui/material";

import CardContent from "./cardContent";
import CardTitle from "./cardTitle";

import styles from "../../styles/Card.module.scss";
import CardBottom from "./cardBottom";

export default function Card(props) {
  const { posts } = props;
  return (
    <Grid container spacing={2} component="section">
      {posts.length > 0 &&
        posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id} component="article">
            <MuiCard className={styles.cardWrap}>
              <MuiCardContent className={styles.cardBox}>
                <CardTitle title={post.title} slug={post.slug} />
                <CardContent content={post.preview} />
                <CardBottom createdAt={post.createdAt} tags={post.tag} />
              </MuiCardContent>
            </MuiCard>
          </Grid>
        ))}
    </Grid>
  );
}

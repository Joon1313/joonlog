import {
  Card as MuiCard,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import Link from "next/link";
export default function Card(props) {
  const { posts } = props;
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={6} key={post.id} component="article">
          <MuiCard>
            <CardContent>
              <Link href={`/posts/${post.id}`} passHref={true}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ cursor: "pointer" }}
                >
                  {post.title}
                </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
              <Divider className="divider" />
              <Typography variant="body2" color="text.secondary">
                {post.id}
              </Typography>
            </CardContent>
          </MuiCard>
        </Grid>
      ))}
    </Grid>
  );
}

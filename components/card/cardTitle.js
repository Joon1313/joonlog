import Link from "next/link";
import { Typography } from "@mui/material";
import styles from "../../styles/Card.module.scss";

export default function CardTitle(props) {
  const { title, postId } = props;
  return (
    <Link href={`/posts/${postId}`} passHref={true}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        className={styles.cardTitle}
      >
        {title}
      </Typography>
    </Link>
  );
}

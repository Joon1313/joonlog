import { Typography } from "@mui/material";
import { getKrDate } from "../../controller/post";
import styles from "../../styles/Card.module.scss";

export default function Date(props) {
  const { createdAt } = props;
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      className={styles.cardtime}
    >
      <time>{getKrDate(createdAt)}</time>
    </Typography>
  );
}

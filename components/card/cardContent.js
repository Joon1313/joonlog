import { Typography } from "@mui/material";
import styles from "../../styles/Card.module.scss";

export default function CardContent(props) {
  const { content } = props;
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      className={styles.cardContent}
    >
      {content}
    </Typography>
  );
}

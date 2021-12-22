import { Typography } from "@mui/material";
import styles from "../../styles/Card.module.scss";

export default function Tag(props) {
  const { tags } = props;
  return (
    <Typography variant="body2" color="text.secondary">
      {tags.map((tag) => (
        <span className={styles.tag} key={tag}>
          {tag}
        </span>
      ))}
    </Typography>
  );
}

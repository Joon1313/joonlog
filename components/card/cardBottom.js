import Date from "../common/date";
import Tag from "../common/tag";
import styles from "../../styles/Card.module.scss";

export default function CardBottom(props) {
  const { createdAt, tags } = props;
  return (
    <div className={styles.cardBottom}>
      <Date createdAt={createdAt} />
      <Tag tags={tags} />
    </div>
  );
}

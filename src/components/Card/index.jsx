import styles from "./index.module.css";
export default function Card(props) {
  return (
    <div class={styles.card} on:click={props.onClick}>
      {props.children}
    </div>
  );
}

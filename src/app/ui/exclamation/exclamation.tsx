import styles from "@/app/ui/home.module.css";

export default function Exclamation() {
  return (
    <>
      <div className="block">
        <div>
          <p>　┏┓　</p>
          <p>　┃┃　</p>
          <p>　┃┃　</p>
          <p>　┗┛　</p>
          <p>　┏┓　</p>
          <p>　┗┛　</p>
        </div>
        <div className={styles.exclamation_sub}>
          <p>　┏┓　</p>
          <p>　┃┃　</p>
          <p>　┃┃　</p>
          <p>　┗┛　</p>
          <p>　┏┓　</p>
          <p>　┗┛　</p>
        </div>
      </div>
    </>
  );
}

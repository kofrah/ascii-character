import styles from "@/app/ui/home.module.css";
import Image from "next/image";
import localImage from "../../../../public/header.png";

export default function Header() {
  return (
    <>
      <meta
        name="twitter:image"
        content="https://dekamoji-generator.com/favicon.ico"
      />
      <div className={styles.title}>
        <Image src={localImage} alt="header" width={500} height={300} />
      </div>
    </>
  );
}

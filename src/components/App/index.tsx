"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { uid } from "uid";
import styles from "./style.module.scss";

export default function App(): JSX.Element {
  const [sharesheetId, setSharesheetId] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSharesheetId(uid());
  }, []);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerTexts}>
            <h1 className={styles.h1}>Share Sheets</h1>
            <p className={styles.headerDescription}>
              パッとつくってサッとわたそう
            </p>
          </div>
          <button
            className={styles.button}
            onClick={() => {
              router.push(`/sharesheets/${sharesheetId}`);
            }}
          >
            シートを作る
          </button>
        </div>
      </header>
      <footer className={styles.footer}>&copy; 2024 kk-web</footer>
    </div>
  );
}

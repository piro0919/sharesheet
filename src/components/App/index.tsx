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
      <hr className={styles.hr} />
      <main className={styles.main}>
        <article>
          <h2>ログイン不要</h2>
          <p>ログインすることなく作成、編集、保存および共有が可能です。</p>
        </article>
        <article>
          <h2>シンプルな操作性</h2>
          <p>最低限の機能のみを保持しており、複雑な操作を伴いません。</p>
        </article>
        <article>
          <h2>簡単に共有可能</h2>
          <p>URL をそのまま共有することで、他の方も閲覧可能となります。</p>
        </article>
        <article>
          <h2>利用無料</h2>
          <p>無料で利用可能となっております。</p>
        </article>
      </main>
      <footer className={styles.footer}>&copy; 2024 kk-web</footer>
    </div>
  );
}

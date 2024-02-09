"use client";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { PrimeIcons } from "primereact/api";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useMemo, useRef } from "react";
import useMeasure from "react-use-measure";
import styles from "./style.module.scss";

registerAllModules();

export default function Sharesheet(): JSX.Element {
  const data = useMemo(
    () =>
      Array.from({ length: 1000 }, () => Array.from({ length: 26 }, () => "")),
    [],
  );
  const items: MenuItem[] = useMemo(
    () => [
      {
        icon: PrimeIcons.FILE,
        items: [
          {
            icon: PrimeIcons.SAVE,
            label: "保存",
          },
          {
            separator: true,
          },
          {
            icon: PrimeIcons.DOWNLOAD,
            label: "ダウンロード",
          },
          {
            separator: true,
          },
          {
            icon: PrimeIcons.PENCIL,
            label: "名前を変更",
          },
        ],
        label: "ファイル",
      },
      {
        icon: PrimeIcons.QUESTION_CIRCLE,
        items: [
          {
            icon: PrimeIcons.MONEY_BILL,
            label: "寄付",
          },
        ],
        label: "ヘルプ",
      },
    ],
    [],
  );
  const [navRef, { height: navHeight }] = useMeasure();
  // TODO: const hotRef = useRef<HotTableClass>(null);
  const hotRef = useRef(null);

  return (
    <>
      <nav className={styles.nav} ref={navRef}>
        <Menubar className={styles.menubar} model={items} />
      </nav>
      {navHeight > 0 ? (
        <div style={{ paddingTop: navHeight }}>
          <HotTable
            autoColumnSize={true}
            autoWrapCol={false}
            autoWrapRow={false}
            colHeaders={true}
            colWidths={100}
            data={data}
            height={`calc(100dvh - ${navHeight}px)`}
            licenseKey="non-commercial-and-evaluation"
            manualColumnMove={true}
            manualColumnResize={true}
            manualRowMove={true}
            manualRowResize={true}
            ref={hotRef}
            rowHeaders={true}
          />
        </div>
      ) : null}
    </>
  );
}

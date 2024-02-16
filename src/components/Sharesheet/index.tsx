/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { HotTable } from "@handsontable/react";
import Tippy from "@tippyjs/react";
import GitHub from "@uiw/react-color-github";
import { registerAllModules } from "handsontable/registry";
import { PrimeIcons } from "primereact/api";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaPaintRoller,
  FaPaintbrush,
  FaStrikethrough,
} from "react-icons/fa6";
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
  const [topRef, { height: topHeight }] = useMeasure();
  // TODO: const hotRef = useRef<HotTableClass>(null);
  const hotRef = useRef(null);
  const [range, setRange] = useState<{
    column: number;
    column2: number;
    row: number;
    row2: number;
  }>();
  const setClassName = useCallback<(args: { className: string }) => void>(
    ({ className: styleClassName }) => {
      if (!hotRef.current || !range) {
        return;
      }

      const { column, column2, row, row2 } = range;

      // @ts-ignore
      hotRef.current.hotInstance.selectCell(row, column, row2, column2);

      // @ts-ignore
      const { className = "" } = hotRef.current.hotInstance.getCellMeta(
        row,
        column,
      );
      const hasStyle = className.split(" ").includes(styleClassName);

      Array.from({ length: row2 - row + 1 }).forEach((_, rowIndex) => {
        Array.from({ length: column2 - column + 1 }).forEach(
          (_, columnIndex) => {
            if (!hotRef.current) {
              return;
            }

            const { className = "" } =
              // @ts-ignore
              hotRef.current.hotInstance.getCellMeta(
                rowIndex + row,
                columnIndex + column,
              );
            const classNames = className.split(" ");

            // @ts-ignore
            hotRef.current.hotInstance.setCellMeta(
              rowIndex + row,
              columnIndex + column,
              "className",
              (hasStyle
                ? classNames.filter(
                    (className: string) => className !== styleClassName,
                  )
                : [...classNames, styleClassName]
              ).join(" "),
            );
          },
        );
      });
    },
    [range],
  );

  return (
    <>
      <div className={styles.topWrapper} ref={topRef}>
        <nav className={styles.nav}>
          <Menubar className={styles.menubar} model={items} />
        </nav>
        <div className={styles.buttonsWrapper}>
          <button
            className={styles.button}
            onClick={() => {
              setClassName({ className: styles.bold });
            }}
          >
            <FaBold size={12} />
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setClassName({ className: styles.italic });
            }}
          >
            <FaItalic size={12} />
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setClassName({ className: styles.strikethrough });
            }}
          >
            <FaStrikethrough size={12} />
          </button>
          <Tippy
            content={
              <GitHub
                // eslint-disable-next-line unused-imports/no-unused-vars
                onChange={({ hex }) => {
                  setClassName({
                    className: styles.color,
                  });
                }}
              />
            }
            interactive={true}
            trigger="click"
          >
            <button
              className={styles.button}
              onClick={() => {
                if (!hotRef.current || !range) {
                  return;
                }

                const { column, column2, row, row2 } = range;

                // @ts-ignore
                hotRef.current.hotInstance.selectCell(
                  row,
                  column,
                  row2,
                  column2,
                );
              }}
            >
              <FaPaintbrush size={12} />
            </button>
          </Tippy>
          <div className={styles.separater} />
          <button className={styles.button}>
            <FaPaintRoller size={12} />
          </button>
        </div>
      </div>
      {topHeight > 0 ? (
        <div style={{ paddingTop: topHeight }}>
          <HotTable
            afterSelection={(row, column, row2, column2) => {
              setRange({ column, column2, row, row2 });
            }}
            autoColumnSize={true}
            autoWrapCol={false}
            autoWrapRow={false}
            colHeaders={true}
            colWidths={100}
            data={data}
            height={`calc(100dvh - ${topHeight}px)`}
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

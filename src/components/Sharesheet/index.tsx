/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { HotTable } from "@handsontable/react";
import Tippy from "@tippyjs/react";
import GitHub from "@uiw/react-color-github";
import { DetailedSettings } from "handsontable/plugins/customBorders";
import { registerAllModules } from "handsontable/registry";
import { PrimeIcons } from "primereact/api";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  BsBorder,
  BsBorderAll,
  BsBorderBottom,
  BsBorderCenter,
  BsBorderInner,
  BsBorderLeft,
  BsBorderMiddle,
  BsBorderOuter,
  BsBorderRight,
  BsBorderTop,
} from "react-icons/bs";
import {
  FaBold,
  FaItalic,
  FaPaintRoller,
  FaPaintbrush,
  FaStrikethrough,
} from "react-icons/fa6";
import { MdFormatColorReset } from "react-icons/md";
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
  const rangeRef = useRef<{
    column: number;
    column2: number;
    row: number;
    row2: number;
  }>();
  const selectCell = useCallback(() => {
    if (!hotRef.current || !rangeRef.current) {
      return;
    }

    const {
      current: { column, column2, row, row2 },
    } = rangeRef;

    // @ts-ignore
    hotRef.current.hotInstance.selectCell(row, column, row2, column2);
  }, []);
  const setClassName = useCallback<
    (args: {
      callback?: (args: { column: number; row: number }) => void;
      className: string;
    }) => void
  >(
    ({ callback, className: styleClassName }) => {
      selectCell();

      if (!hotRef.current || !rangeRef.current) {
        return;
      }

      const {
        current: { column, column2, row, row2 },
      } = rangeRef;
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

            if (callback) {
              callback({ column: columnIndex + column, row: rowIndex + row });
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

      // @ts-ignore
      hotRef.current.hotInstance.render();
    },
    [selectCell],
  );
  const [customBorders, setCustomBorders] = useState<DetailedSettings[]>([]);
  const colorClassNames = useMemo(
    () => [
      styles.colorb80000,
      styles.colordb3e00,
      styles.colorfccb00,
      styles.color008b02,
      styles.color006b76,
      styles.color1273de,
      styles.color004dcf,
      styles.color5300eb,
      styles.coloreb9694,
      styles.colorfad0c3,
      styles.colorfef3bd,
      styles.colorc1e1c5,
      styles.colorbedadc,
      styles.colorc4def6,
      styles.colorbed3f3,
      styles.colord4c4fb,
    ],
    [],
  );
  const backgroundClassNames = useMemo(
    () => [
      styles.backgroundb80000,
      styles.backgrounddb3e00,
      styles.backgroundfccb00,
      styles.background008b02,
      styles.background006b76,
      styles.background1273de,
      styles.background004dcf,
      styles.background5300eb,
      styles.backgroundeb9694,
      styles.backgroundfad0c3,
      styles.backgroundfef3bd,
      styles.backgroundc1e1c5,
      styles.backgroundbedadc,
      styles.backgroundc4def6,
      styles.backgroundbed3f3,
      styles.backgroundd4c4fb,
    ],
    [],
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
            className={styles.tippy}
            content={
              <div className={styles.tippyContentInner}>
                <GitHub
                  onChange={({ hex }) => {
                    setClassName({
                      callback: ({ column, row }) => {
                        if (!hotRef.current) {
                          return;
                        }

                        const { className = "" } =
                          // @ts-ignore
                          hotRef.current.hotInstance.getCellMeta(row, column);
                        const classNames = className.split(" ");

                        // @ts-ignore
                        hotRef.current.hotInstance.setCellMeta(
                          row,
                          column,
                          "className",
                          classNames
                            .filter(
                              (className: string) =>
                                !colorClassNames.includes(className),
                            )
                            .join(" "),
                        );
                      },
                      className: styles[`color${hex.replace("#", "")}`],
                    });
                  }}
                />
                <button
                  className={styles.resetButton}
                  onClick={() => {
                    selectCell();

                    if (!hotRef.current || !rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        Array.from({
                          length: column2 - column + 1,
                        }).forEach((_, columnIndex) => {
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
                            classNames
                              .filter(
                                (className: string) =>
                                  !colorClassNames.includes(className),
                              )
                              .join(" "),
                          );
                        });
                      },
                    );

                    // @ts-ignore
                    hotRef.current.hotInstance.render();
                  }}
                >
                  <MdFormatColorReset size={18} />
                  リセット
                </button>
              </div>
            }
            interactive={true}
            trigger="click"
          >
            <button
              className={styles.button}
              onClick={() => {
                selectCell();
              }}
            >
              <FaPaintbrush size={12} />
            </button>
          </Tippy>
          <div className={styles.separater} />
          <Tippy
            className={styles.tippy}
            content={
              <div className={styles.tippyContentInner}>
                <GitHub
                  onChange={({ hex }) => {
                    setClassName({
                      callback: ({ column, row }) => {
                        if (!hotRef.current) {
                          return;
                        }

                        const { className = "" } =
                          // @ts-ignore
                          hotRef.current.hotInstance.getCellMeta(row, column);
                        const classNames = className.split(" ");

                        // @ts-ignore
                        hotRef.current.hotInstance.setCellMeta(
                          row,
                          column,
                          "className",
                          classNames
                            .filter(
                              (className: string) =>
                                !backgroundClassNames.includes(className),
                            )
                            .join(" "),
                        );
                      },
                      className: styles[`background${hex.replace("#", "")}`],
                    });
                  }}
                />
                <button
                  className={styles.resetButton}
                  onClick={() => {
                    selectCell();

                    if (!hotRef.current || !rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        Array.from({
                          length: column2 - column + 1,
                        }).forEach((_, columnIndex) => {
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
                            classNames
                              .filter(
                                (className: string) =>
                                  !backgroundClassNames.includes(className),
                              )
                              .join(" "),
                          );
                        });
                      },
                    );

                    // @ts-ignore
                    hotRef.current.hotInstance.render();
                  }}
                >
                  <MdFormatColorReset size={18} />
                  リセット
                </button>
              </div>
            }
            interactive={true}
            trigger="click"
          >
            <button
              className={styles.button}
              onClick={() => {
                selectCell();
              }}
            >
              <FaPaintRoller size={12} />
            </button>
          </Tippy>
          <Tippy
            className={styles.tippy}
            content={
              <div className={styles.borderButtonsWrapper}>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        Array.from({ length: column2 - column + 1 }).forEach(
                          (_, columnIndex) => {
                            setCustomBorders((prevCustomBorders) => [
                              ...prevCustomBorders,
                              {
                                bottom: {
                                  width: 1,
                                },
                                col: columnIndex + column,
                                end: {
                                  width: 1,
                                },
                                row: rowIndex + row,
                                start: {
                                  width: 1,
                                },
                                top: {
                                  width: 1,
                                },
                              },
                            ]);
                          },
                        );
                      },
                    );
                  }}
                >
                  <BsBorderAll size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        Array.from({ length: column2 - column + 1 }).forEach(
                          (_, columnIndex) => {
                            setCustomBorders((prevCustomBorders) => [
                              ...prevCustomBorders,
                              {
                                bottom:
                                  rowIndex === row2 - row
                                    ? undefined
                                    : {
                                        width: 1,
                                      },
                                col: columnIndex + column,
                                end:
                                  columnIndex === column2 - column
                                    ? undefined
                                    : {
                                        width: 1,
                                      },
                                row: rowIndex + row,
                                start:
                                  columnIndex === 0
                                    ? undefined
                                    : {
                                        width: 1,
                                      },
                                top:
                                  rowIndex === 0
                                    ? undefined
                                    : {
                                        width: 1,
                                      },
                              },
                            ]);
                          },
                        );
                      },
                    );
                  }}
                >
                  <BsBorderInner size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        Array.from({ length: column2 - column + 1 }).forEach(
                          (_, columnIndex) => {
                            setCustomBorders((prevCustomBorders) => [
                              ...prevCustomBorders,
                              {
                                bottom:
                                  rowIndex === row2 - row
                                    ? undefined
                                    : {
                                        width: 1,
                                      },
                                col: columnIndex + column,
                                row: rowIndex + row,
                              },
                            ]);
                          },
                        );
                      },
                    );
                  }}
                >
                  <BsBorderCenter size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        Array.from({ length: column2 - column + 1 }).forEach(
                          (_, columnIndex) => {
                            setCustomBorders((prevCustomBorders) => [
                              ...prevCustomBorders,
                              {
                                col: columnIndex + column,
                                end:
                                  columnIndex === column2 - column
                                    ? undefined
                                    : {
                                        width: 1,
                                      },
                                row: rowIndex + row,
                              },
                            ]);
                          },
                        );
                      },
                    );
                  }}
                >
                  <BsBorderMiddle size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        Array.from({ length: column2 - column + 1 }).forEach(
                          (_, columnIndex) => {
                            setCustomBorders((prevCustomBorders) => [
                              ...prevCustomBorders,
                              {
                                bottom:
                                  rowIndex === row2 - row
                                    ? {
                                        width: 1,
                                      }
                                    : undefined,
                                col: columnIndex + column,
                                end:
                                  columnIndex === column2 - column
                                    ? {
                                        width: 1,
                                      }
                                    : undefined,
                                row: rowIndex + row,
                                start:
                                  columnIndex === 0
                                    ? {
                                        width: 1,
                                      }
                                    : undefined,
                                top:
                                  rowIndex === 0
                                    ? {
                                        width: 1,
                                      }
                                    : undefined,
                              },
                            ]);
                          },
                        );
                      },
                    );
                  }}
                >
                  <BsBorderOuter size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        setCustomBorders((prevCustomBorders) => [
                          ...prevCustomBorders,
                          {
                            col: column,
                            row: rowIndex + row,
                            start: {
                              width: 1,
                            },
                          },
                        ]);
                      },
                    );
                  }}
                >
                  <BsBorderLeft size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row },
                    } = rangeRef;

                    Array.from({ length: column2 - column + 1 }).forEach(
                      (_, columnIndex) => {
                        setCustomBorders((prevCustomBorders) => [
                          ...prevCustomBorders,
                          {
                            col: columnIndex + column,
                            row: row,
                            top: {
                              width: 1,
                            },
                          },
                        ]);
                      },
                    );
                  }}
                >
                  <BsBorderTop size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        setCustomBorders((prevCustomBorders) => [
                          ...prevCustomBorders,
                          {
                            col: column2,
                            end: {
                              width: 1,
                            },
                            row: rowIndex + row,
                          },
                        ]);
                      },
                    );
                  }}
                >
                  <BsBorderRight size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row2 },
                    } = rangeRef;

                    Array.from({ length: column2 - column + 1 }).forEach(
                      (_, columnIndex) => {
                        setCustomBorders((prevCustomBorders) => [
                          ...prevCustomBorders,
                          {
                            bottom: {
                              width: 1,
                            },
                            col: columnIndex + column,
                            row: row2,
                          },
                        ]);
                      },
                    );
                  }}
                >
                  <BsBorderBottom size={12} />
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    selectCell();

                    if (!rangeRef.current) {
                      return;
                    }

                    const {
                      current: { column, column2, row, row2 },
                    } = rangeRef;

                    Array.from({ length: row2 - row + 1 }).forEach(
                      (_, rowIndex) => {
                        Array.from({ length: column2 - column + 1 }).forEach(
                          (_, columnIndex) => {
                            setCustomBorders((prevCustomBorders) =>
                              prevCustomBorders.filter(
                                (prevCustomBorder) =>
                                  ("col" in prevCustomBorder &&
                                    prevCustomBorder.col !==
                                      columnIndex + column) ||
                                  ("row" in prevCustomBorder &&
                                    prevCustomBorder.row !== rowIndex + row),
                              ),
                            );
                          },
                        );
                      },
                    );
                  }}
                >
                  <BsBorder size={12} />
                </button>
              </div>
            }
            interactive={true}
            trigger="click"
          >
            <button
              className={styles.button}
              onClick={() => {
                selectCell();
              }}
            >
              <BsBorderAll size={12} />
            </button>
          </Tippy>
        </div>
      </div>
      {topHeight > 0 ? (
        <div style={{ paddingTop: topHeight }}>
          <HotTable
            afterSelection={(row, column, row2, column2) => {
              rangeRef.current = { column, column2, row, row2 };
            }}
            autoColumnSize={true}
            autoWrapCol={false}
            autoWrapRow={false}
            colHeaders={true}
            colWidths={100}
            customBorders={customBorders}
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

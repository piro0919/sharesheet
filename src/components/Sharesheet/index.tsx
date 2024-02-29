/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { HotTable, HotTableProps } from "@handsontable/react";
import { DetailedSettings } from "handsontable/plugins/customBorders";
import { registerAllModules } from "handsontable/registry";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ControlBar, { ControlBarProps } from "../ControlBar";
import MenuBar, { MenuBarProps } from "../MenuBar";
import styles from "./style.module.scss";

const MySwal = withReactContent(Swal);

registerAllModules();

export type SharesheetProps = Pick<MenuBarProps, "sharesheetId"> & {
  sharesheetId: HotTableProps["id"];
};

export default function Sharesheet({
  sharesheetId,
}: SharesheetProps): JSX.Element {
  const data = useMemo(
    () =>
      Array.from({ length: 1000 }, () => Array.from({ length: 26 }, () => "")),
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
  const handleSelectCell = useCallback<ControlBarProps["onSelectCell"]>(() => {
    if (!hotRef.current || !rangeRef.current) {
      return;
    }

    const {
      current: { column, column2, row, row2 },
    } = rangeRef;

    // @ts-ignore
    hotRef.current.hotInstance.selectCell(row, column, row2, column2, false);
  }, []);
  const toggleClassName = useCallback<
    (args: {
      className: string;
      duplicatedClassNames?: string[];
      isReset?: boolean;
    }) => void
  >(({ className: styleClassName, duplicatedClassNames }) => {
    if (!hotRef.current || !rangeRef.current) {
      return;
    }

    const {
      current: { column, column2, row, row2 },
    } = rangeRef;

    // @ts-ignore
    hotRef.current.hotInstance.selectCell(row, column, row2, column2, false);

    // @ts-ignore
    const { className = "" } = hotRef.current.hotInstance.getCellMeta(
      row,
      column,
    );
    const hasClassName = (className as string)
      .split(" ")
      .includes(styleClassName);

    Array.from({ length: row2 - row + 1 }).forEach((_, rowIndex) => {
      Array.from({ length: column2 - column + 1 }).forEach((_, columnIndex) => {
        const currentColumn = columnIndex + column;
        const currentRow = rowIndex + row;
        // @ts-ignore
        const { className = "" } = hotRef.current.hotInstance.getCellMeta(
          currentRow,
          currentColumn,
        );
        const classNames = (className as string)
          .split(" ")
          .filter(
            (className) =>
              !duplicatedClassNames ||
              !duplicatedClassNames.includes(className),
          );

        // @ts-ignore
        hotRef.current.hotInstance.setCellMeta(
          currentRow,
          currentColumn,
          "className",
          (hasClassName
            ? classNames.filter((className) => className !== styleClassName)
            : [...classNames, styleClassName]
          ).join(" "),
        );
      });
    });

    // @ts-ignore
    hotRef.current.hotInstance.render();
  }, []);
  const resetClassNames = useCallback<(args: { classNames: string[] }) => void>(
    ({ classNames }) => {
      if (!hotRef.current || !rangeRef.current) {
        return;
      }

      const {
        current: { column, column2, row, row2 },
      } = rangeRef;

      // @ts-ignore
      hotRef.current.hotInstance.selectCell(row, column, row2, column2, false);

      Array.from({ length: row2 - row + 1 }).forEach((_, rowIndex) => {
        Array.from({ length: column2 - column + 1 }).forEach(
          (_, columnIndex) => {
            const currentColumn = columnIndex + column;
            const currentRow = rowIndex + row;
            // @ts-ignore
            const { className = "" } = hotRef.current.hotInstance.getCellMeta(
              currentRow,
              currentColumn,
            );

            // @ts-ignore
            hotRef.current.hotInstance.setCellMeta(
              currentRow,
              currentColumn,
              "className",
              (className as string)
                .split(" ")
                .filter((className) => !classNames.includes(className))
                .join(" "),
            );
          },
        );
      });

      // @ts-ignore
      hotRef.current.hotInstance.render();
    },
    [],
  );
  const handleToggleBold = useCallback<ControlBarProps["onToggleBold"]>(() => {
    toggleClassName({ className: styles.bold });
  }, [toggleClassName]);
  const handleToggleItalic = useCallback<
    ControlBarProps["onToggleItalic"]
  >(() => {
    toggleClassName({ className: styles.italic });
  }, [toggleClassName]);
  const handleToggleStrikethrough = useCallback<
    ControlBarProps["onToggleStrikethrough"]
  >(() => {
    toggleClassName({ className: styles.strikethrough });
  }, [toggleClassName]);
  const backgroundColorClassNames = useMemo(
    () => [
      styles.backgroundColorb80000,
      styles.backgroundColordb3e00,
      styles.backgroundColorfccb00,
      styles.backgroundColor008b02,
      styles.backgroundColor006b76,
      styles.backgroundColor1273de,
      styles.backgroundColor004dcf,
      styles.backgroundColor5300eb,
      styles.backgroundColoreb9694,
      styles.backgroundColorfad0c3,
      styles.backgroundColorfef3bd,
      styles.backgroundColorc1e1c5,
      styles.backgroundColorbedadc,
      styles.backgroundColorc4def6,
      styles.backgroundColorbed3f3,
      styles.backgroundColord4c4fb,
    ],
    [],
  );
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
  const handleChangeBackgroundColor = useCallback<
    NonNullable<ControlBarProps["onChangeBackgroundColor"]>
  >(
    ({ hex }) => {
      toggleClassName({
        className: styles[`backgroundColor${hex.replace("#", "")}`],
        duplicatedClassNames: backgroundColorClassNames,
      });
    },
    [backgroundColorClassNames, toggleClassName],
  );
  const handleChangeColor = useCallback<
    NonNullable<ControlBarProps["onChangeColor"]>
  >(
    ({ hex }) => {
      toggleClassName({
        className: styles[`color${hex.replace("#", "")}`],
        duplicatedClassNames: colorClassNames,
      });
    },
    [colorClassNames, toggleClassName],
  );
  const handleResetBackgroundColor = useCallback<
    NonNullable<ControlBarProps["onResetBackgroundColor"]>
  >(() => {
    resetClassNames({
      classNames: backgroundColorClassNames,
    });
  }, [backgroundColorClassNames, resetClassNames]);
  const handleResetColor = useCallback<
    NonNullable<ControlBarProps["onResetColor"]>
  >(() => {
    resetClassNames({
      classNames: colorClassNames,
    });
  }, [colorClassNames, resetClassNames]);
  const afterSelectionEnd = useCallback<
    NonNullable<HotTableProps["afterSelectionEnd"]>
  >((row, column, row2, column2) => {
    rangeRef.current = {
      column: column >= 0 ? column : 0,
      column2,
      row: row >= 0 ? row : 0,
      row2,
    };
  }, []);
  const [customBorders, setCustomBorders] = useState<DetailedSettings[]>([]);
  const handleSetBorders = useCallback<ControlBarProps["onSetBorders"]>(
    // TODO
    // eslint-disable-next-line unused-imports/no-unused-vars
    ({ position }) => {
      if (!hotRef.current || !rangeRef.current) {
        return;
      }

      const {
        current: { column, column2, row, row2 },
      } = rangeRef;

      // @ts-ignore
      hotRef.current.hotInstance.selectCell(row, column, row2, column2, false);

      setCustomBorders((prevCustomBorders) => [
        ...prevCustomBorders,
        ...Array.from({ length: row2 - row + 1 }).flatMap((_, rowIndex) =>
          Array.from({ length: column2 - column + 1 }).flatMap(
            (_, columnIndex) => {
              const currentColumn = columnIndex + column;
              const currentRow = rowIndex + row;

              return {
                bottom: {
                  width: 1,
                },
                col: currentColumn,
                end: {
                  width: 1,
                },
                row: currentRow,
                start: {
                  width: 1,
                },
                top: {
                  width: 1,
                },
              };
            },
          ),
        ),
      ]);

      // Array.from({ length: row2 - row + 1 }).forEach((_, rowIndex) => {
      //   Array.from({ length: column2 - column + 1 }).forEach(
      //     (_, columnIndex) => {
      //       const currentColumn = columnIndex + column;
      //       const currentRow = rowIndex + row;

      //       setCustomBorders((prevCustomBorders) => {
      //         switch (position) {
      //           case "all": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 bottom: {
      //                   width: 1,
      //                 },
      //                 col: currentColumn,
      //                 end: {
      //                   width: 1,
      //                 },
      //                 row: currentRow,
      //                 start: {
      //                   width: 1,
      //                 },
      //                 top: {
      //                   width: 1,
      //                 },
      //               },
      //             ];
      //           }
      //           case "bottom": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 bottom: {
      //                   width: 1,
      //                 },
      //                 col: currentColumn,
      //                 row: row2,
      //               },
      //             ];
      //           }
      //           case "center": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 bottom:
      //                   rowIndex === row2 - row
      //                     ? undefined
      //                     : {
      //                         width: 1,
      //                       },
      //                 col: currentColumn,
      //                 row: currentRow,
      //               },
      //             ];
      //           }
      //           case "inner": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 bottom:
      //                   rowIndex === row2 - row
      //                     ? undefined
      //                     : {
      //                         width: 1,
      //                       },
      //                 col: currentColumn,
      //                 end:
      //                   columnIndex === column2 - column
      //                     ? undefined
      //                     : {
      //                         width: 1,
      //                       },
      //                 row: currentRow,
      //                 start:
      //                   columnIndex === 0
      //                     ? undefined
      //                     : {
      //                         width: 1,
      //                       },
      //                 top:
      //                   rowIndex === 0
      //                     ? undefined
      //                     : {
      //                         width: 1,
      //                       },
      //               },
      //             ];
      //           }
      //           case "left": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 col: column,
      //                 row: currentRow,
      //                 start: {
      //                   width: 1,
      //                 },
      //               },
      //             ];
      //           }
      //           case "middle": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 col: currentColumn,
      //                 end:
      //                   columnIndex === column2 - column
      //                     ? undefined
      //                     : {
      //                         width: 1,
      //                       },
      //                 row: currentRow,
      //               },
      //             ];
      //           }
      //           case "none": {
      //             return prevCustomBorders.filter(
      //               (prevCustomBorder) =>
      //                 ("col" in prevCustomBorder &&
      //                   prevCustomBorder.col !== currentColumn) ||
      //                 ("row" in prevCustomBorder &&
      //                   prevCustomBorder.row !== currentRow),
      //             );
      //           }
      //           case "outer": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 bottom:
      //                   rowIndex === row2 - row
      //                     ? {
      //                         width: 1,
      //                       }
      //                     : undefined,
      //                 col: currentColumn,
      //                 end:
      //                   columnIndex === column2 - column
      //                     ? {
      //                         width: 1,
      //                       }
      //                     : undefined,
      //                 row: currentRow,
      //                 start:
      //                   columnIndex === 0
      //                     ? {
      //                         width: 1,
      //                       }
      //                     : undefined,
      //                 top:
      //                   rowIndex === 0
      //                     ? {
      //                         width: 1,
      //                       }
      //                     : undefined,
      //               },
      //             ];
      //           }
      //           case "right": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 col: column2,
      //                 end: {
      //                   width: 1,
      //                 },
      //                 row: currentRow,
      //               },
      //             ];
      //           }
      //           case "top": {
      //             return [
      //               ...prevCustomBorders,
      //               {
      //                 col: currentColumn,
      //                 row: row,
      //                 top: {
      //                   width: 1,
      //                 },
      //               },
      //             ];
      //           }
      //           default: {
      //             return prevCustomBorders;
      //           }
      //         }
      //       });
      //     },
      //   );
      // });
    },
    [],
  );

  useEffect(() => {
    const callback = async (): Promise<void> => {
      const { value } = await MySwal.fire({
        allowEscapeKey: false,
        allowOutsideClick: false,
        icon: "question",
        input: "text",
        inputValidator: (value) =>
          value ? undefined : "名前を入力してください。",
        title: "名前を付けてください",
      });

      if (typeof value !== "string") {
        return;
      }

      window.localStorage.setItem(`${sharesheetId}-title`, value);
    };
    const title = window.localStorage.getItem(`${sharesheetId}-title`);

    if (title) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    callback();
  }, [sharesheetId]);

  return (
    <>
      <div className={styles.topWrapper} ref={topRef}>
        <MenuBar sharesheetId={sharesheetId} />
        <ControlBar
          onChangeBackgroundColor={handleChangeBackgroundColor}
          onChangeColor={handleChangeColor}
          onResetBackgroundColor={handleResetBackgroundColor}
          onResetColor={handleResetColor}
          onSelectCell={handleSelectCell}
          onSetBorders={handleSetBorders}
          onToggleBold={handleToggleBold}
          onToggleItalic={handleToggleItalic}
          onToggleStrikethrough={handleToggleStrikethrough}
        />
      </div>
      {topHeight > 0 ? (
        <HotTable
          afterSelectionEnd={afterSelectionEnd}
          colHeaders={true}
          colWidths={100}
          customBorders={customBorders}
          data={data}
          height={`calc(100dvh - ${topHeight}px)`}
          id={sharesheetId}
          licenseKey="non-commercial-and-evaluation"
          ref={hotRef}
          rowHeaders={true}
          style={{ marginTop: topHeight }}
        />
      ) : null}
    </>
  );
}

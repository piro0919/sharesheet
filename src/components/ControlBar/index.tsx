import Tippy from "@tippyjs/react";
import GitHub, { GithubProps } from "@uiw/react-color-github";
import { MouseEventHandler } from "react";
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
import styles from "./styles.module.scss";

type Position =
  | "all"
  | "bottom"
  | "center"
  | "inner"
  | "left"
  | "middle"
  | "outer"
  | "right"
  | "top"
  | "none";

export type ControlBarProps = {
  onChangeBackgroundColor: GithubProps["onChange"];
  onChangeColor: GithubProps["onChange"];
  onResetBackgroundColor: MouseEventHandler<HTMLButtonElement>;
  onResetColor: MouseEventHandler<HTMLButtonElement>;
  onSelectCell: MouseEventHandler<HTMLButtonElement>;
  onSetBorders: (args: { position: Position }) => void;
  onToggleBold: MouseEventHandler<HTMLButtonElement>;
  onToggleItalic: MouseEventHandler<HTMLButtonElement>;
  onToggleStrikethrough: MouseEventHandler<HTMLButtonElement>;
};

export default function ControlBar({
  onChangeBackgroundColor,
  onChangeColor,
  onResetBackgroundColor,
  onResetColor,
  onSelectCell,
  onSetBorders,
  onToggleBold,
  onToggleItalic,
  onToggleStrikethrough,
}: ControlBarProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onToggleBold}>
        <FaBold size={12} />
      </button>
      <button className={styles.button} onClick={onToggleItalic}>
        <FaItalic size={12} />
      </button>
      <button className={styles.button} onClick={onToggleStrikethrough}>
        <FaStrikethrough size={12} />
      </button>
      <Tippy
        className={styles.tippy}
        content={
          <div className={styles.tippyContentInner}>
            <GitHub onChange={onChangeColor} />
            <button className={styles.resetButton} onClick={onResetColor}>
              <MdFormatColorReset size={18} />
              リセット
            </button>
          </div>
        }
        interactive={true}
        trigger="click"
      >
        <button className={styles.button} onClick={onSelectCell}>
          <FaPaintbrush size={12} />
        </button>
      </Tippy>
      <div className={styles.separater} />
      <Tippy
        className={styles.tippy}
        content={
          <div className={styles.tippyContentInner}>
            <GitHub onChange={onChangeBackgroundColor} />
            <button
              className={styles.resetButton}
              onClick={onResetBackgroundColor}
            >
              <MdFormatColorReset size={18} />
              リセット
            </button>
          </div>
        }
        interactive={true}
        trigger="click"
      >
        <button className={styles.button} onClick={onSelectCell}>
          <FaPaintRoller size={12} />
        </button>
      </Tippy>
      <Tippy
        className={styles.tippy}
        content={
          <div className={styles.tippyContentInner2}>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "all" });
              }}
            >
              <BsBorderAll size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "inner" });
              }}
            >
              <BsBorderInner size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "center" });
              }}
            >
              <BsBorderCenter size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "middle" });
              }}
            >
              <BsBorderMiddle size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "outer" });
              }}
            >
              <BsBorderOuter size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "left" });
              }}
            >
              <BsBorderLeft size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "top" });
              }}
            >
              <BsBorderTop size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "right" });
              }}
            >
              <BsBorderRight size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "bottom" });
              }}
            >
              <BsBorderBottom size={12} />
            </button>
            <button
              className={styles.button}
              onClick={() => {
                onSetBorders({ position: "none" });
              }}
            >
              <BsBorder size={12} />
            </button>
          </div>
        }
        interactive={true}
        trigger="click"
      >
        <button className={styles.button} onClick={onSelectCell}>
          <BsBorderAll size={12} />
        </button>
      </Tippy>
    </div>
  );
}

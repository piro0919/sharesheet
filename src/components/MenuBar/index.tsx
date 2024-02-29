import { PrimeIcons } from "primereact/api";
import { Menubar } from "primereact/menubar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { uid } from "uid";
import styles from "./style.module.scss";

const MySwal = withReactContent(Swal);

export type MenuBarProps = {
  sharesheetId: string;
};

export default function MenuBar({ sharesheetId }: MenuBarProps): JSX.Element {
  return (
    <nav>
      <Menubar
        className={styles.menubar}
        model={[
          {
            id: uid(),
            items: [
              {
                icon: PrimeIcons.SAVE,
                id: uid(),
                label: "保存",
              },
              {
                id: uid(),
                separator: true,
              },
              {
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                command: async (): Promise<void> => {
                  const title = window.localStorage.getItem(
                    `${sharesheetId}-title`,
                  );
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const { value } = await MySwal.fire({
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    icon: "question",
                    input: "text",
                    inputValidator: (value) =>
                      value ? undefined : "名前を入力してください。",
                    inputValue: title || "",
                    title: "名前を付けてください",
                  });

                  if (typeof value !== "string") {
                    return;
                  }

                  window.localStorage.setItem(`${sharesheetId}-title`, value);
                },
                icon: PrimeIcons.PENCIL,
                id: uid(),
                label: "名前を変更",
              },
            ],
            label: "ファイル",
          },
          {
            id: uid(),
            items: [
              {
                icon: PrimeIcons.QUESTION_CIRCLE,
                id: uid(),
                label: "シェアシートのヘルプ",
                target: "_blank",
                url: "/docs",
              },
            ],
            label: "ヘルプ",
          },
        ]}
      />
    </nav>
  );
}

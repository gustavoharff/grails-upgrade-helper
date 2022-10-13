import { DiffType } from "./type";

import styles from "./header.module.css";
import { FileDiffType } from "../../types";

interface DiffHeaderProps {
  readonly type: FileDiffType;
  readonly newPath?: string;
  readonly oldPath?: string;
}

export function DiffHeader({ newPath, oldPath, type }: DiffHeaderProps) {
  function getPathWithouAppName(path?: string) {
    return path?.replace("myapp/", "");
  }

  function getPath() {
    if (type === "delete") {
      return <span>{getPathWithouAppName(oldPath)}</span>;
    }

    if (oldPath !== newPath && type !== "add") {
      return (
        <span>
          {getPathWithouAppName(oldPath)} `{">"}`{" "}
          {getPathWithouAppName(newPath)}
        </span>
      );
    }

    return <span>{getPathWithouAppName(newPath)}</span>;
  }

  return (
    <div className={styles.diffHeader}>
      {getPath()} <DiffType type={type} />
    </div>
  );
}

import { DiffType, FileDiffType } from "./diff-type";

interface DiffHeaderProps {
  type: FileDiffType;
  newPath: string;
  oldPath: string;
  hasDiff: boolean;
}

export function DiffHeader({ newPath, oldPath, type }: DiffHeaderProps) {
  const fileName = () => {
    if (type === "delete") {
      return <span>{oldPath?.replace("myapp/", "")}</span>;
    }

    if (oldPath !== newPath && type !== "add") {
      return (
        <span>
          {oldPath?.replace("myapp/", "")} `{">"}`{" "}
          {newPath?.replace("myapp/", "")}
        </span>
      );
    }

    return <span>{newPath?.replace("myapp/", "")}</span>;
  };

  return (
    <div className="diff-header">
      {fileName()} <DiffType type={type} />
    </div>
  );
}

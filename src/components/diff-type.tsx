import { Tag, TagProps } from "antd";

export type FileDiffType = "add" | "modify" | "delete" | "deleted" | "rename";

interface DiffTypeProps extends TagProps {
  type: FileDiffType;
}

export function DiffType({ type, ...props }: DiffTypeProps) {
  const colors = {
    add: "blue",
    modify: "green",
    delete: "red",
    rename: "orange",
    deleted: "red",
  };

  const labels = {
    add: "ADDED",
    modify: "MODIFIED",
    delete: "DELETED",
    deleted: "DELETED",
    rename: "RENAMED",
  };

  return (
    <Tag {...props} color={colors[type]}>
      {labels[type]}
    </Tag>
  );
}

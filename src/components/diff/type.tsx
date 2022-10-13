import { Tag, TagProps } from "antd";

import { FileDiffType } from "../../types";

interface DiffTypeProps extends TagProps {
  readonly type: FileDiffType;
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

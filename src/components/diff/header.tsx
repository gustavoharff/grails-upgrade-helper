import { DiffType } from "./type";

import { DownOutlined, RightOutlined } from "@ant-design/icons";
import styles from "./header.module.css";
import { FileDiffType } from "../../types";
import styled from "@emotion/styled";
import { Button, ButtonProps, Tag, TagProps } from "antd";

interface DiffHeaderProps {
  readonly type: FileDiffType;
  readonly newPath?: string;
  readonly oldPath?: string;
  readonly hasDiff?: boolean;
  readonly newVersion: string;
  readonly newType: string;
  readonly newProfile: string;
  readonly isDiffCollapsed: boolean;
  readonly setIsDiffCollapsed: (value: boolean) => void;
}

const FileRenameArrow = styled(RightOutlined)({
  fontSize: "10px",
  margin: "0 5px",
  color: "#f78206",
});

interface BinaryBadgeProps extends TagProps {
  visible: boolean;
}

function BinaryBadge({ visible, ...props }: BinaryBadgeProps) {
  if (!visible) {
    return null;
  }

  return (
    <Tag {...props} color="cyan">
      BINARY
    </Tag>
  );
}

interface CollapseDiffButtonProps extends ButtonProps {
  visible: boolean;
  isDiffCollapsed: boolean;
}

const CollapseDiffButton = styled(
  ({ visible, isDiffCollapsed, ...props }: CollapseDiffButtonProps) =>
    visible ? <Button {...props} type="link" icon={<DownOutlined />} /> : null
)`
  color: #24292e;
  margin-right: 2px;
  font-size: 10px;
  width: 10px;
  transform: ${({ isDiffCollapsed }) => isDiffCollapsed ? "rotate(-90deg)" : "initial"};
  transition: transform 0.2s ease-in-out;
  transform-origin: center;
  line-height: 0;
  height: auto;
  &:hover,
  &:focus {
    color: #24292e;
  }
`;

export function DiffHeader({
  newPath,
  oldPath,
  type,
  newVersion,
  newProfile,
  newType,
  hasDiff,
  isDiffCollapsed,
  setIsDiffCollapsed,
}: DiffHeaderProps) {
  function getPathWithouAppName(path?: string) {
    return path?.replace("myapp/", "").replace("myplugin/", "");
  }

  function getPath() {
    if (type === "delete") {
      return <span>{getPathWithouAppName(oldPath)}</span>;
    }

    if (oldPath !== newPath && type !== "add") {
      return (
        <span>
          {getPathWithouAppName(oldPath)}
          <FileRenameArrow />
          {getPathWithouAppName(newPath)}
        </span>
      );
    }

    return <span>{getPathWithouAppName(newPath)}</span>;
  }

  function getOriginFilePath() {
    return `https://github.com/gustavoharff/grails-diffs/raw/version/${newVersion}-${newProfile}-${newType}/${newPath}`;
  }

  function renderNewFile() {
    if (type === "delete" || type === "deleted") return null;

    return (
      <a target="_blank" href={getOriginFilePath()}>
        View file
      </a>
    );
  }

  return (
    <div className={styles.diffHeader}>
      <button
        className={styles.collapsableClickArea}
        onClick={() => setIsDiffCollapsed(!isDiffCollapsed)}
        style={{ cursor: hasDiff ? 'pointer' :'default'}}
      >
        <CollapseDiffButton
          visible={hasDiff ?? false}
          isDiffCollapsed={isDiffCollapsed}
        />
        {getPath()}
        <DiffType type={type} />
        <BinaryBadge visible={!hasDiff} />
      </button>

      <div>{renderNewFile()}</div>
    </div>
  );
}

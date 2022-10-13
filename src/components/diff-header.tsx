interface DiffHeaderProps {
  type: string;
  newPath: string;
  oldPath: string;
}

export function DiffHeader({ newPath, oldPath, type }: DiffHeaderProps) {
  const fileName = () => {
    if (type === "delete") {
      return <span>{oldPath}</span>;
    }

    if (oldPath !== newPath && type !== "add") {
      return (
        <span>
          {oldPath} `{">"}` {newPath}
        </span>
      );
    }

    return <span>{newPath}</span>;
  };

  return <div className="diff-header">{fileName()}</div>;
}

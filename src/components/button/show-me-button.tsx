import styles from "./show-me-button.module.css";

import { Button } from "antd";

interface ShowMeButtonProps {
  onClick: () => void;
}
export function ShowMeButton({ onClick }: ShowMeButtonProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "auto",
        overflow: "hidden",
        marginTop: 25,
      }}
    >
      <Button
        onClick={onClick}
        type="primary"
        size="large"
        style={{
          borderRadius: 3,
        }}
      >
        Show me
      </Button>
    </div>
  );
}

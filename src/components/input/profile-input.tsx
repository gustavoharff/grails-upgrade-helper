import { Select } from "../select";
import styles from "./input.module.css";

interface ProfileInputProps {
  readonly label: string;
  readonly selectedProfile: string;
  readonly onChange: (value: string) => void;
  readonly visible?: boolean;
}

export function ProfileInput({
  selectedProfile,
  label,
  onChange,
  visible = true,
}: ProfileInputProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Select
        title={label}
        value={selectedProfile}
        onChange={onChange}
        options={["web", "rest-api"]}
        defaultValue="web"
      />
    </div>
  );
}

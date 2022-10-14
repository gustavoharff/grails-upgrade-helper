import { Select } from "../select";
import styles from "./input.module.css";

interface ProfileInputProps {
  readonly label: string;
  readonly selectedProfile: string;
  readonly onChange: (value: string) => void;
}

export function ProfileInput({
 selectedProfile,
  label,
  onChange
}: ProfileInputProps) {
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

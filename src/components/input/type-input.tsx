import { Select } from "../select";
import styles from "./input.module.css";

interface TypeInputProps {
  readonly label: string;
  readonly selectedType: string;
  readonly onChange: (value: string) => void;
}

export function TypeInput({ selectedType, label, onChange }: TypeInputProps) {
  return (
    <div className={styles.container}>
      <Select
        title={label}
        value={selectedType}
        onChange={onChange}
        options={["app", "plugin"]}
        defaultValue="app"
      />
    </div>
  );
}

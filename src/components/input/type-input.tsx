import styles from "./input.module.css";

interface TypeInputProps {
  readonly label: string;
  readonly selectedType: string;
  readonly onChange: (value: string) => void;
}

export function TypeInput({
 selectedType,
  label,
  onChange
}: TypeInputProps) {
  return (
    <div className={styles.container}>
      {label}
      <select
        className={styles.input}
        value={selectedType}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="app">app</option>
        <option value="plugin">plugin</option>
      </select>
    </div>
  );
}

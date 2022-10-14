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
      {label}
      <select
        className={styles.input}
        value={selectedProfile}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="web">web</option>
        <option value="rest-api">rest-api</option>
      </select>
    </div>
  );
}

import styles from "./input.module.css";

interface VersionInputProps {
  readonly label: string;
  readonly versions: string[];
  readonly selectedVersion: string | null;
  readonly onChange: (value: string) => void;
}

export function VersionInput({
  selectedVersion,
  versions,
  label,
  onChange
}: VersionInputProps) {
  return (
    <div className={styles.container}>
      {label}
      <select
        className={styles.input}
        value={selectedVersion ?? undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">None</option>
        {versions.map((version) => (
          <option key={version} value={version}>
            {version}
          </option>
        ))}
      </select>
    </div>
  );
}

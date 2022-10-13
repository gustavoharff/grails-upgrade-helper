import axios from "axios";
import { useEffect, useState } from "react";
import { Diff } from "./components/diff";

export function App() {
  const [diff, setDiff] = useState<string | null>(null);

  const [versions, setVersions] = useState<string[]>([]);

  const [oldVersion, setOldVersion] = useState("5.1.9");
  const [newVersion, setNewVersion] = useState("5.2.4");

  useEffect(() => {
    axios
      .get<string>(
        "https://raw.githubusercontent.com/gustavoharff/grails-diffs/main/RELEASES"
      )
      .then((response) => {
        setVersions(response.data.split("\n").filter((v) => v));
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://raw.githubusercontent.com/gustavoharff/grails-diffs/diffs/diffs/${oldVersion}..${newVersion}.diff`
      )
      .then((response) => {
        setDiff(response.data);
      });
  }, [oldVersion, newVersion]);

  return (
    <div style={{ padding: 16 }}>
      <select
        value={oldVersion}
        onChange={(event) => setOldVersion(event.target.value)}
      >
        {versions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={newVersion}
        onChange={(event) => setNewVersion(event.target.value)}
      >
        {versions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div
        style={{
          marginTop: 16,
        }}
      >
        {diff && <Diff diff={diff} />}
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Diff } from "./components/diff";

const options = ["5.1.9", "5.2.0", "5.2.1", "5.2.2", "5.2.3", "5.2.4"];

export function App() {
  const [diff, setDiff] = useState<string | null>(null);

  const [oldVersion, setOldVersion] = useState("5.1.9");
  const [newVersion, setNewVersion] = useState("5.2.4");

  useEffect(() => {
    axios
      .get(
        `https://raw.githubusercontent.com/gustavoharff/grails-upgrade-helper/diffs/diffs/${oldVersion}..${newVersion}.diff`
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
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>

      <select
        value={newVersion}
        onChange={(event) => setNewVersion(event.target.value)}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
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

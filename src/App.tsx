import axios from "axios";
import { useEffect, useState } from "react";
import { Diff } from "./components/diff";

export function App() {
  const [diff, setDiff] = useState<string | null>(null);

  const [oldVersion, setOldVersion] = useState("5.2.2");
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
    <div>
      <input
        type="text"
        value={oldVersion}
        onChange={(event) => setOldVersion(event.target.value)}
      />
      <input
        type="text"
        value={newVersion}
        onChange={(event) => setNewVersion(event.target.value)}
      />

      {diff && <Diff diff={diff} />}
    </div>
  );
}

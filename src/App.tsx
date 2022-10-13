import axios from "axios";
import { useEffect, useState } from "react";
import { Diff } from "./components/diff";

import { VersionInput } from "./components/version-input/input";

export function App() {
  const [diff, setDiff] = useState<string | null>(null);

  const [versions, setVersions] = useState<string[]>([]);

  const [oldVersion, setOldVersion] = useState<string | null>("");
  const [newVersion, setNewVersion] = useState<string | null>("");

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
    if (!oldVersion || !newVersion) {
      setDiff(null);
      return
    }

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
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <VersionInput
          label="What's your current Grails version?"
          selectedVersion={oldVersion}
          versions={versions}
          onChange={setOldVersion}
        />

        <VersionInput
          label="Which version would you like to upgrade to?"
          selectedVersion={newVersion}
          versions={versions}
          onChange={setNewVersion}
        />
      </div>

      <div style={{ marginTop: 16 }}>{diff && <Diff diff={diff} />}</div>
    </div>
  );
}

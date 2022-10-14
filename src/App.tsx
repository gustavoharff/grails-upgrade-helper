import axios from "axios";
import { useEffect, useState } from "react";
import { ShowMeButton } from "./components/button";
import { Diffs } from "./components/diff";

import { VersionInput, TypeInput, ProfileInput } from "./components/input";

export function App() {
  const [diff, setDiff] = useState<string | null>(null);

  const [versions, setVersions] = useState<Set<string>>(new Set());

  const [oldType, setOldType] = useState("app");
  const [oldProfile, setOldProfile] = useState("web");
  const [newType, setNewType] = useState("app");
  const [newProfile, setNewProfile] = useState("web");
  const [oldVersion, setOldVersion] = useState<string>("");
  const [newVersion, setNewVersion] = useState<string>("");

  useEffect(() => {
    axios
      .get<string>(
        "https://raw.githubusercontent.com/gustavoharff/grails-diffs/main/RELEASES"
      )
      .then((response) => {
        setVersions(
          new Set(
            response.data
              .split("\n")
              .filter((v) => v)
              .map((v) =>
                v
                  .replace("web", "")
                  .replace("rest-api", "")
                  .replace("app", "")
                  .replace("plugin", "")
                  .replaceAll("-", "")
              )
          )
        );
      });
  }, []);

  async function submit() {
    if (!oldVersion || !newVersion) {
      setDiff(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/gustavoharff/grails-diffs/diffs/diffs/${oldVersion}-${oldProfile}-${oldType}..${newVersion}-${newProfile}-${newType}.diff`
      );

      setDiff(response.data);
    } catch (error) {
      setDiff(null);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
        <div>
          <VersionInput
            label="What's your current Grails version?"
            selectedVersion={oldVersion}
            versions={versions}
            onChange={setOldVersion}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginTop: 16,
            }}
          >
            <TypeInput
              label="Current Grails type?"
              selectedType={oldType}
              onChange={setOldType}
            />

            <ProfileInput
              label="Current Grails profile?"
              selectedProfile={oldProfile}
              onChange={setOldProfile}
            />
          </div>
        </div>

        <div>
          <VersionInput
            label="Which version would you like to upgrade to?"
            selectedVersion={newVersion}
            versions={versions}
            onChange={setNewVersion}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginTop: 16,
            }}
          >
            <TypeInput
              label="New Grails type:"
              selectedType={newType}
              onChange={setNewType}
            />

            <ProfileInput
              label="New Grails profile:"
              selectedProfile={newProfile}
              onChange={setNewProfile}
            />
          </div>
        </div>
      </div>

      <ShowMeButton onClick={submit} />

      <div style={{ marginTop: 16 }}>
        {diff && (
          <Diffs
            newProfile={newProfile}
            newType={newType}
            newVersion={newVersion}
            diff={diff}
          />
        )}
      </div>
    </div>
  );
}

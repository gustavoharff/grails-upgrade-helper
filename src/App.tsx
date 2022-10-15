import { RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import semver from "semver";
import { ShowMeButton } from "./components/button";
import { Diffs } from "./components/diff";

import { VersionSection } from "./components/version-section";
import { useFetchDiff } from "./hooks/use-fetch-diff";

export function App() {
  const [versions, setVersions] = useState<Set<string>>(new Set());

  const [fromVersion, setFromVersion] = useState<string>("");
  const [fromType, setFromType] = useState("app");
  const [fromProfile, setFromProfile] = useState("web");

  const [toVersion, setToVersion] = useState<string>("");
  const [toType, setToType] = useState("app");
  const [toProfile, setToProfile] = useState("web");

  const { diff, fetch, isFetching } = useFetchDiff({
    fromVersion,
    toVersion,
    fromType,
    toType,
    fromProfile,
    toProfile,
  });

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

  function onFromVersionChange(version: string) {
    if (version && semver.lt(version, "3.0.0")) {
      setFromProfile("web");
    }

    setFromVersion(version);
  }

  function onToVersionChange(version: string) {
    if (version && semver.lt(version, "3.0.0")) {
      setToProfile("web");
    }

    setToVersion(version);
  }

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <VersionSection
          versionTitle="From Grails version"
          versions={versions}
          version={fromVersion}
          onVersionChange={onFromVersionChange}
          typeTitle="Application type"
          type={fromType}
          onTypeChange={setFromType}
          profileTitle="Application profile"
          profile={fromProfile}
          onProfileChange={setFromProfile}
        />

        <RightOutlined />

        <VersionSection
          versionTitle="To Grails version"
          versions={versions}
          version={toVersion}
          onVersionChange={onToVersionChange}
          typeTitle="Application type"
          type={toType}
          onTypeChange={setToType}
          profileTitle="Application profile"
          profile={toProfile}
          onProfileChange={setToProfile}
        />
      </div>

      <ShowMeButton onClick={fetch} loading={isFetching} />

      <div style={{ marginTop: 16 }}>
        {diff && (
          <Diffs
            newProfile={toProfile}
            newType={toType}
            newVersion={toVersion}
            diff={diff}
          />
        )}
      </div>
    </div>
  );
}

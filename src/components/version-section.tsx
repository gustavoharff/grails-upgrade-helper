import styled from "@emotion/styled";
import { useMemo } from "react";
import semver from "semver";
import { ProfileInput, TypeInput, VersionInput } from "./input";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  border: 1px solid #3333;
  padding: 32px;
`;

interface VersionSectionProps {
  versionTitle: string;
  versions: Set<string>;
  version: string;
  onVersionChange: (version: string) => void;
  typeTitle: string;
  type: string;
  onTypeChange: (type: string) => void;
  profileTitle: string;
  profile: string;
  onProfileChange: (profile: string) => void;
}

export function VersionSection(props: VersionSectionProps) {
  const {
    versionTitle,
    versions,
    version,
    onVersionChange,
    typeTitle,
    type,
    onTypeChange,
    profileTitle,
    profile,
    onProfileChange,
  } = props;

  const profileVisible = useMemo(() => {
    if (!version) return false;

    return semver.gte(version, "3.0.0");
  }, [version]);

  return (
    <Container>
      <VersionInput
        label={versionTitle}
        selectedVersion={version}
        versions={versions}
        onChange={onVersionChange}
      />

      <TypeInput
        label={typeTitle}
        selectedType={type}
        onChange={onTypeChange}
      />

      <ProfileInput
        label={profileTitle}
        selectedProfile={profile}
        onChange={onProfileChange}
        visible={profileVisible}
      />
    </Container>
  );
}

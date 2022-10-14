import { Fragment, useState } from "react";
import {
  parseDiff,
  Diff as RDiff,
  Hunk,
  Decoration,
  markEdits,
  tokenize,
  // @ts-expect-error
} from "react-diff-view";
import { DiffHeader } from "./header";

import styles from "./diff.module.css";

interface DiffsProps {
  readonly diff: string;
  readonly newVersion: string;
  readonly newType: string;
  readonly newProfile: string;
}

export function Diffs(props: DiffsProps) {
  const files = parseDiff(props.diff);

  return files.map((file: any) => (
    <Diff
      file={file}
      newProfile={props.newProfile}
      newVersion={props.newVersion}
      newType={props.newType}
    />
  ));
}

interface DiffProps {
  readonly file: any;
  readonly newProfile: string;
  readonly newVersion: string;
  readonly newType: string;
}

function Diff({ file, newProfile, newVersion, newType }: DiffProps) {
  const [isDiffCollapsed, setIsDiffCollapsed] = useState(false);

  return (
    <div className={styles.diffContainer}>
      <DiffHeader
        newPath={file.newPath}
        oldPath={file.oldPath}
        type={file.type === "new" ? "add" : file.type}
        newProfile={newProfile}
        newVersion={newVersion}
        newType={newType}
        hasDiff={file.hunks.length > 0}
        isDiffCollapsed={isDiffCollapsed}
        setIsDiffCollapsed={setIsDiffCollapsed}
      />

      {!isDiffCollapsed && (
        <div>
          <RDiff
            viewType="split"
            diffType={file.type === "new" ? "add" : file.type}
            hunks={file.hunks}
            optimizeSelection={true}
          >
            {(hunks: any) => {
              const options = {
                enhancers: [markEdits(hunks)],
              };

              const tokens = tokenize(hunks, options);

              return hunks.map((hunk: any) => (
                <Fragment key={"decoration-" + hunk.content}>
                  <Decoration>
                    <div className={styles.hunkContent}>{hunk.content}</div>
                  </Decoration>

                  <Hunk key={hunk.content} hunk={hunk} tokens={tokens} />
                </Fragment>
              ));
            }}
          </RDiff>
        </div>
      )}
    </div>
  );
}

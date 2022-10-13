import React from "react";
import {
  parseDiff,
  Diff as RDiff,
  Hunk,
  Decoration,
  getChangeKey,
} from "react-diff-view";

interface DiffProps {
  diff: string;
}

export function Diff(props: DiffProps) {
  const files = parseDiff(props.diff);

  return (
    <div>
      {files.map(({ oldRevision, newRevision, type, hunks }) => (
        <RDiff
          key={oldRevision + "-" + newRevision}
          viewType="split"
          diffType={type}
          hunks={hunks}
        >
          {(hunks) =>
            hunks.map((hunk) => (
              <>
                <Decoration key={"decoration-" + hunk.content}>
                  {hunk.content}
                </Decoration>
                <Hunk key={hunk.content} hunk={hunk} />
              </>
            ))
          }
        </RDiff>
      ))}
    </div>
  );
}

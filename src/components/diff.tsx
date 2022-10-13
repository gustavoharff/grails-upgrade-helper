import { parseDiff, Diff as RDiff, Hunk, Decoration } from "react-diff-view";
import { DiffHeader } from "./diff-header";

interface DiffProps {
  diff: string;
}

export function Diff(props: DiffProps) {
  const files = parseDiff(props.diff);

  return (
    <div>
      {files.map(
        ({ oldRevision, newRevision, type, hunks, newPath, oldPath }) => (
          <div
            style={{
              marginTop: 32,
              border: "1px solid rgb(232, 232, 232)",
              borderRadius: 3,
            }}
          >
            <DiffHeader newPath={newPath} oldPath={oldPath} type={type} />
            <div>
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
            </div>
          </div>
        )
      )}
    </div>
  );
}

import { Fragment, useState } from "react";
import {
  parseDiff,
  Diff as RDiff,
  Hunk,
  Decoration,
  markEdits,
  tokenize,
} from "react-diff-view";
import { DiffHeader } from "./diff-header";

interface DiffProps {
  diff: string;
}

export function Diff(props: DiffProps) {
  const files = parseDiff(props.diff);

  return (
    <div>
      {files.map(
        ({
          oldRevision,
          newRevision,
          type,
          hunks,
          newPath,
          oldPath,
          ...rest
        }) => (
          <div
            key={oldRevision + "-" + newRevision}
            style={{
              marginTop: 32,
              border: "1px solid rgb(232, 232, 232)",
              borderRadius: 3,
            }}
          >
            <DiffHeader
              newPath={newPath}
              oldPath={oldPath}
              type={type === "new" ? "add" : type}
              hasDiff={hunks.length > 0}
              {...rest}
            />

            <div>
              <RDiff
                viewType="split"
                diffType={type === "new" ? "add" : type}
                hunks={hunks}
                optimizeSelection={true}
              >
                {(hunks) => {
                  const options = {
                    enhancers: [markEdits(hunks)],
                  };

                  const tokens = tokenize(hunks, options);

                  return hunks.map((hunk) => (
                    <Fragment key={"decoration-" + hunk.content}>
                      <Decoration>
                        <div
                          style={{
                            backgroundColor: "#f1f8ff",
                            marginLeft: 30,
                            paddingLeft: 4,
                            color: "#1b1f23b3",
                          }}
                        >
                          {hunk.content}
                        </div>
                      </Decoration>

                      <Hunk
                        key={hunk.content}
                        hunk={hunk}
                        tokens={tokens}
                        gutterEvents={{ onClick: () => {} }}
                      />
                    </Fragment>
                  ));
                }}
              </RDiff>
            </div>
          </div>
        )
      )}
    </div>
  );
}

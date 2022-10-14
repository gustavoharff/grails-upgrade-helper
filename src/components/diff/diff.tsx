import { Fragment } from "react";
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

interface DiffProps {
  readonly diff: string;
}

export function Diff(props: DiffProps) {
  const files = parseDiff(props.diff);

  return files.map((file: any) => (
    <div
      className={styles.diffContainer}
    >
      <DiffHeader
        newPath={file.newPath}
        oldPath={file.oldPath}
        type={file.type === "new" ? "add" : file.type}
      />

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
    </div>
  ));
}

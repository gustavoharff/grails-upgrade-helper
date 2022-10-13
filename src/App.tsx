import { Diff } from "./components/diff";

const diff = `diff --git a/gradle.properties b/gradle.properties
index f3eb227..2cc0d8a 100644
--- a/gradle.properties
+++ b/gradle.properties
@@ -1,4 +1,4 @@
-grailsVersion=5.2.3
+grailsVersion=5.2.4
 grailsGradlePluginVersion=5.2.3
 groovyVersion=3.0.11
 gorm.version=7.3.2
`;

export function App() {
  return <Diff diff={diff} />;
}

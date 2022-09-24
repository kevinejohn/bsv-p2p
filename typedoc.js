// typedoc.js
/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  entryPoints: ["./src/index.ts"],
  plugin: ["typedoc-plugin-markdown"],
  readme: "none",
  githubPages: false,
  gitRevision: "master",
};

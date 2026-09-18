# Repository guidelines

Use mise as the entrypoint for all development tooling. `mise.toml` and `mise.lock` own tool versions and task definitions. Discover tasks with `mise tasks` and prefer `mise run <task>` over direct package-manager, Astro, TypeScript, Playwright or formatter commands.

If a necessary workflow is missing, add a narrowly scoped mise task before running it. Update dependencies through `mise run deps:update` after editing `package.json`; install locked dependencies with `mise run setup`. Do not work around a failed direct package-manager command with elevated permissions; use the repository-owned mise task.

Keep Czech and English content complete and aligned. Preserve unrelated user changes. Run `mise run check:full` for behavior changes and `mise run build` for the final production artifact. Keep Google Analytics disabled unless configuration is explicitly supplied.

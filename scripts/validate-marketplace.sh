#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
marketplace="${root}/.agents/plugins/marketplace.json"

command -v jq >/dev/null 2>&1 || {
  echo "jq is required" >&2
  exit 1
}

jq -e '
  .name == "codex-lark" and
  .interface.displayName == "Codex Lark" and
  (.plugins | length == 1) and
  .plugins[0].name == "feishu2codex"
' "${marketplace}" >/dev/null

jq -e '
  .plugins | type == "array" and length > 0 and
  all(.[];
    ((keys | sort) == ["category", "name", "policy", "source"]) and
    (.name | type == "string" and length > 0) and
    (.source.source == "local") and
    (.source.path | startswith("./plugins/")) and
    (.policy.installation | IN("NOT_AVAILABLE", "AVAILABLE", "INSTALLED_BY_DEFAULT")) and
    (.policy.authentication | IN("ON_INSTALL", "ON_USE")) and
    (.category | type == "string" and length > 0)
  )
' "${marketplace}" >/dev/null

while IFS=$'\t' read -r name relative_path; do
  plugin_dir="${root}/${relative_path#./}"
  manifest="${plugin_dir}/.codex-plugin/plugin.json"

  test -d "${plugin_dir}" || {
    echo "Missing plugin directory: ${relative_path}" >&2
    exit 1
  }
  test -f "${manifest}" || {
    echo "Missing plugin manifest: ${manifest}" >&2
    exit 1
  }
  jq empty "${manifest}"
  test "$(jq -r '.name' "${manifest}")" = "${name}" || {
    echo "Plugin name mismatch: ${name}" >&2
    exit 1
  }
  jq -e '.version | type == "string" and test("^[0-9]+\\.[0-9]+\\.[0-9]+([+-][0-9A-Za-z.-]+)?$")' "${manifest}" >/dev/null
done < <(jq -r '.plugins[] | [.name, .source.path] | @tsv' "${marketplace}")

if grep -R -n -E '\[TODO:|TODO' "${root}/.agents" "${root}/plugins"; then
  echo "Unresolved TODO found in publishable plugin files" >&2
  exit 1
fi

echo "Marketplace validation passed"

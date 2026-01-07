# @opentui-ui

UI component library for terminal applications built on [@opentui/core](https://github.com/sst/opentui).

## Packages

| Package                                       | Description                         | npm                                                                                                           |
| --------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [@opentui-ui/dialog](./packages/dialog)       | Dialogs made easy                   | [![npm](https://img.shields.io/npm/v/@opentui-ui/dialog)](https://www.npmjs.com/package/@opentui-ui/dialog) |
| [@opentui-ui/toast](./packages/toast)         | Sonner-inspired toast notifications | [![npm](https://img.shields.io/npm/v/@opentui-ui/toast)](https://www.npmjs.com/package/@opentui-ui/toast)     |
| [@opentui-ui/panel](./packages/panel)         | Container component for grouped content | [![npm](https://img.shields.io/npm/v/@opentui-ui/panel)](https://www.npmjs.com/package/@opentui-ui/panel)   |
| [@opentui-ui/status-bar](./packages/status-bar) | Fixed bottom bar for app state/info | [![npm](https://img.shields.io/npm/v/@opentui-ui/status-bar)](https://www.npmjs.com/package/@opentui-ui/status-bar) |
| [@opentui-ui/header](./packages/header)       | Fixed top bar with title and actions | [![npm](https://img.shields.io/npm/v/@opentui-ui/header)](https://www.npmjs.com/package/@opentui-ui/header) |
| [@opentui-ui/footer](./packages/footer)       | Fixed bottom bar with help text/actions | [![npm](https://img.shields.io/npm/v/@opentui-ui/footer)](https://www.npmjs.com/package/@opentui-ui/footer) |
| [@opentui-ui/sidebar](./packages/sidebar)     | Vertical navigation panel (collapsible) | [![npm](https://img.shields.io/npm/v/@opentui-ui/sidebar)](https://www.npmjs.com/package/@opentui-ui/sidebar) |
| [@opentui-ui/split-pane](./packages/split-pane) | Resizable horizontal/vertical layouts | [![npm](https://img.shields.io/npm/v/@opentui-ui/split-pane)](https://www.npmjs.com/package/@opentui-ui/split-pane) |
| [@opentui-ui/tabs](./packages/tabs)           | Tabbed interface with tab switching | [![npm](https://img.shields.io/npm/v/@opentui-ui/tabs)](https://www.npmjs.com/package/@opentui-ui/tabs) |
| [@opentui-ui/accordion](./packages/accordion) | Collapsible sections                | [![npm](https://img.shields.io/npm/v/@opentui-ui/accordion)](https://www.npmjs.com/package/@opentui-ui/accordion) |

## Installation

```bash
# Install a specific package
bun add @opentui-ui/toast
```

## Development

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Lint & format
bun run lint
bun run format

# Clean build artifacts
bun run clean
```

### Release workflow

1. Push changes to `main` with changeset files
2. GitHub Actions creates a "Version Packages" PR
3. Review the PR (it updates versions and changelogs)
4. Merge the PR to publish to npm with provenance

## License

MIT

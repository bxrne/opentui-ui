# @opentui-ui/panel

A panel container component for terminal UIs built on OpenTUI.

## Installation

```bash
bun add @opentui-ui/panel
```

## Usage

```typescript
import { PanelRenderable } from "@opentui-ui/panel";
import { TextRenderable } from "@opentui/core";

const panel = new PanelRenderable(ctx, {
  title: "My Panel",
  content: new TextRenderable(ctx, { content: "Panel content" }),
  backgroundColor: "#1a1a1a",
  border: true,
  padding: 1,
});
```

## API

### PanelRenderable

```typescript
new PanelRenderable(ctx, {
  title?: string | Renderable;
  content: Renderable | Renderable[];
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
  backgroundColor?: string;
  border?: boolean;
  borderColor?: string;
  borderStyle?: BorderStyle;
  padding?: number | PaddingInput;
})
```

## License

MIT

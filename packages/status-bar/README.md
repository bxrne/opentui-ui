# @opentui-ui/status-bar

A status bar component for terminal UIs built on OpenTUI.

## Installation

```bash
bun add @opentui-ui/status-bar
```

## Usage

```typescript
import { StatusBarRenderable } from "@opentui-ui/status-bar";
import { TextRenderable } from "@opentui/core";

const statusBar = new StatusBarRenderable(ctx, {
  left: new TextRenderable(ctx, { content: "Status: Ready" }),
  center: new TextRenderable(ctx, { content: "Press Q to quit" }),
  right: new TextRenderable(ctx, { content: "v1.0.0" }),
  backgroundColor: "#1a1a1a",
  border: true,
});
```

## API

### StatusBarRenderable

```typescript
new StatusBarRenderable(ctx, {
  height?: number;
  backgroundColor?: string;
  border?: boolean;
  borderColor?: string;
  borderStyle?: BorderStyle;
  left?: Renderable | Renderable[];
  center?: Renderable | Renderable[];
  right?: Renderable | Renderable[];
})
```

## License

MIT

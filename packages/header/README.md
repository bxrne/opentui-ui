# @opentui-ui/header

A header component for terminal UIs built on OpenTUI.

## Installation

```bash
bun add @opentui-ui/header
```

## Usage

```typescript
import { HeaderRenderable } from "@opentui-ui/header";
import { TextRenderable } from "@opentui/core";

const header = new HeaderRenderable(ctx, {
  title: "My App",
  actions: new TextRenderable(ctx, { content: "Settings" }),
  backgroundColor: "#1a1a1a",
  border: true,
});
```

## API

### HeaderRenderable

```typescript
new HeaderRenderable(ctx, {
  title: string | Renderable;
  actions?: Renderable | Renderable[];
  height?: number;
  backgroundColor?: string;
  border?: boolean;
  borderColor?: string;
  borderStyle?: BorderStyle;
})
```

## License

MIT

# @opentui-ui/footer

A footer component for terminal UIs built on OpenTUI.

## Installation

```bash
bun add @opentui-ui/footer
```

## Usage

```typescript
import { FooterRenderable } from "@opentui-ui/footer";
import { TextRenderable } from "@opentui/core";

const footer = new FooterRenderable(ctx, {
  content: "Press Q to quit | Press H for help",
  backgroundColor: "#1a1a1a",
  border: true,
});
```

## API

### FooterRenderable

```typescript
new FooterRenderable(ctx, {
  content: string | Renderable | Renderable[];
  height?: number;
  backgroundColor?: string;
  border?: boolean;
  borderColor?: string;
  borderStyle?: BorderStyle;
})
```

## License

MIT

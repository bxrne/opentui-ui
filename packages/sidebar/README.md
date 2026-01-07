# @opentui-ui/sidebar

A sidebar component for terminal UIs built on OpenTUI.

## Installation

```bash
bun add @opentui-ui/sidebar
```

## Usage

```typescript
import { SidebarRenderable } from "@opentui-ui/sidebar";
import { TextRenderable } from "@opentui/core";

const sidebar = new SidebarRenderable(ctx, {
  position: "left",
  width: 20,
  content: new TextRenderable(ctx, { content: "Navigation" }),
  backgroundColor: "#1a1a1a",
  border: true,
});
```

## API

### SidebarRenderable

```typescript
new SidebarRenderable(ctx, {
  position?: 'left' | 'right';
  width?: number;
  collapsedWidth?: number;
  collapsed?: boolean;
  content: Renderable | Renderable[];
  backgroundColor?: string;
  border?: boolean;
  borderColor?: string;
  borderStyle?: BorderStyle;
  onToggle?: (collapsed: boolean) => void;
})
```

## License

MIT

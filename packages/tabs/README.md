# @opentui-ui/tabs

A tabs component for terminal UIs built on OpenTUI.

## Installation

```bash
bun add @opentui-ui/tabs
```

## Usage

```typescript
import { TabsRenderable } from "@opentui-ui/tabs";
import { TextRenderable } from "@opentui/core";

const tabs = new TabsRenderable(ctx, {
  tabs: [
    {
      id: "tab1",
      label: "Tab 1",
      content: new TextRenderable(ctx, { content: "Content 1" }),
    },
    {
      id: "tab2",
      label: "Tab 2",
      content: new TextRenderable(ctx, { content: "Content 2" }),
      closable: true,
    },
  ],
  activeTab: "tab1",
  onTabChange: (id) => console.log("Tab changed:", id),
});
```

## API

### TabsRenderable

```typescript
new TabsRenderable(ctx, {
  tabs: Array<{
    id: string | number;
    label: string | Renderable;
    content: Renderable;
    closable?: boolean;
  }>;
  activeTab?: string | number;
  onTabChange?: (id: string | number) => void;
  onTabClose?: (id: string | number) => void;
})
```

## License

MIT

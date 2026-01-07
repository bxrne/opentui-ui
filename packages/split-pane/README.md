# @opentui-ui/split-pane

A split pane component for terminal UIs built on OpenTUI.

## Installation

```bash
bun add @opentui-ui/split-pane
```

## Usage

```typescript
import { SplitPaneRenderable } from "@opentui-ui/split-pane";
import { TextRenderable } from "@opentui/core";

const splitPane = new SplitPaneRenderable(ctx, {
  direction: "horizontal",
  split: 50,
  first: new TextRenderable(ctx, { content: "Left pane" }),
  second: new TextRenderable(ctx, { content: "Right pane" }),
});
```

## API

### SplitPaneRenderable

```typescript
new SplitPaneRenderable(ctx, {
  direction: 'horizontal' | 'vertical';
  split?: number;
  minSize?: number;
  minSize2?: number;
  maxSize?: number;
  maxSize2?: number;
  resizable?: boolean;
  first: Renderable;
  second: Renderable;
  onSplitChange?: (split: number) => void;
})
```

## License

MIT

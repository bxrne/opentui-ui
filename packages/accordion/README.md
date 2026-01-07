# @opentui-ui/accordion

An accordion component for terminal UIs built on OpenTUI.

## Installation

```bash
bun add @opentui-ui/accordion
```

## Usage

```typescript
import { AccordionRenderable } from "@opentui-ui/accordion";
import { TextRenderable } from "@opentui/core";

const accordion = new AccordionRenderable(ctx, {
  sections: [
    {
      id: "section1",
      title: "Section 1",
      content: new TextRenderable(ctx, { content: "Content 1" }),
      defaultOpen: true,
    },
    {
      id: "section2",
      title: "Section 2",
      content: new TextRenderable(ctx, { content: "Content 2" }),
    },
  ],
  allowMultiple: false,
  onSectionToggle: (id, open) => console.log("Section", id, open ? "opened" : "closed"),
});
```

## API

### AccordionRenderable

```typescript
new AccordionRenderable(ctx, {
  sections: Array<{
    id: string | number;
    title: string | Renderable;
    content: Renderable;
    defaultOpen?: boolean;
  }>;
  allowMultiple?: boolean;
  onSectionToggle?: (id: string | number, open: boolean) => void;
})
```

## License

MIT

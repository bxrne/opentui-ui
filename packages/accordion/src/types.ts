import type { Renderable } from "@opentui/core";

export interface AccordionSection {
  id: string | number;
  title: string | Renderable;
  content: Renderable;
  defaultOpen?: boolean;
}

export interface AccordionOptions {
  /** Array of accordion sections */
  sections: AccordionSection[];
  /** Allow multiple sections open at once */
  allowMultiple?: boolean;
  /** Callback when section toggle state changes */
  onSectionToggle?: (id: string | number, open: boolean) => void;
}


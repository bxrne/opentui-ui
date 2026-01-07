import type { Renderable } from "@opentui/core";

export interface SplitPaneOptions {
  /** Split direction */
  direction: "horizontal" | "vertical";
  /** Split ratio (0-100 percentage or pixels) */
  split?: number;
  /** Minimum size for first pane */
  minSize?: number;
  /** Minimum size for second pane */
  minSize2?: number;
  /** Maximum size for first pane */
  maxSize?: number;
  /** Maximum size for second pane */
  maxSize2?: number;
  /** Whether the split is resizable */
  resizable?: boolean;
  /** First pane content */
  first: Renderable;
  /** Second pane content */
  second: Renderable;
  /** Callback when split changes */
  onSplitChange?: (split: number) => void;
}


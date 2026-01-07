import type { Renderable } from "@opentui/core";

export interface Tab {
  id: string | number;
  label: string | Renderable;
  content: Renderable;
  closable?: boolean;
}

export interface TabsOptions {
  /** Array of tab definitions */
  tabs: Tab[];
  /** Active tab ID */
  activeTab?: string | number;
  /** Callback when active tab changes */
  onTabChange?: (id: string | number) => void;
  /** Callback when a tab is closed */
  onTabClose?: (id: string | number) => void;
}


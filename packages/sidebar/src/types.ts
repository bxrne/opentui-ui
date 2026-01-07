import type { BorderStyle, Renderable } from "@opentui/core";

export interface SidebarOptions {
  /** Position of the sidebar */
  position?: "left" | "right";
  /** Width when expanded */
  width?: number;
  /** Width when collapsed */
  collapsedWidth?: number;
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Sidebar content */
  content: Renderable | Renderable[];
  /** Background color */
  backgroundColor?: string;
  /** Show border */
  border?: boolean;
  /** Border color */
  borderColor?: string;
  /** Border style */
  borderStyle?: BorderStyle;
  /** Callback when collapse state changes */
  onToggle?: (collapsed: boolean) => void;
}


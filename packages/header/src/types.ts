import type { BorderStyle, Renderable } from "@opentui/core";

export interface HeaderOptions {
  /** Header title (string or renderable) */
  title: string | Renderable;
  /** Actions section (right-aligned) */
  actions?: Renderable | Renderable[];
  /** Height of the header */
  height?: number;
  /** Background color */
  backgroundColor?: string;
  /** Show border */
  border?: boolean;
  /** Border color */
  borderColor?: string;
  /** Border style */
  borderStyle?: BorderStyle;
}


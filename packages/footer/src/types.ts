import type { BorderStyle, Renderable } from "@opentui/core";

export interface FooterOptions {
  /** Footer content (string, renderable, or array of renderables) */
  content: string | Renderable | Renderable[];
  /** Height of the footer */
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


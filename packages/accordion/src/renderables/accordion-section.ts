import {
  BoxRenderable,
  TextRenderable,
  type RenderContext,
  type Renderable,
} from "@opentui/core";
import type { AccordionSection } from "../types";

export interface AccordionSectionRenderableOptions {
  section: AccordionSection;
  open: boolean;
  onToggle: () => void;
}

export class AccordionSectionRenderable extends BoxRenderable {
  private _section: AccordionSection;
  private _open: boolean;
  private _onToggle: () => void;
  private _titleRenderable: Renderable;
  private _contentContainer: BoxRenderable;

  constructor(
    ctx: RenderContext,
    options: AccordionSectionRenderableOptions,
  ) {
    super(ctx, {
      id: `accordion-section-${options.section.id}`,
      flexDirection: "column",
      border: true,
      borderColor: "#4a4a4a",
    });

    this._section = options.section;
    this._open = options.open;
    this._onToggle = options.onToggle;

    // Create title
    const titleContainer = new BoxRenderable(ctx, {
      id: `accordion-title-${options.section.id}`,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 1,
      paddingRight: 1,
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: options.open ? "#2a2a2a" : undefined,
    });

    // Create indicator
    const indicator = new TextRenderable(ctx, {
      id: `accordion-indicator-${options.section.id}`,
      content: options.open ? "▼" : "▶",
      fg: "#888888",
    });
    titleContainer.add(indicator);

    // Create title text/renderable
    if (typeof options.section.title === "string") {
      this._titleRenderable = new TextRenderable(ctx, {
        id: `accordion-title-text-${options.section.id}`,
        content: options.section.title,
        fg: "#ffffff",
      });
    } else {
      this._titleRenderable = options.section.title;
    }
    titleContainer.add(this._titleRenderable);

    // Create content container
    this._contentContainer = new BoxRenderable(ctx, {
      id: `accordion-content-${options.section.id}`,
      flexDirection: "column",
      visible: options.open,
      padding: 1,
    });
    this._contentContainer.add(options.section.content);

    // Add title and content
    this.add(titleContainer);
    this.add(this._contentContainer);
  }

  public set open(value: boolean) {
    if (this._open === value) return;

    this._open = value;
    this._contentContainer.visible = value;

    // Update indicator
    const titleContainer = this.children[0];
    if (titleContainer instanceof BoxRenderable) {
      const indicator = titleContainer.children[0];
      if (indicator instanceof TextRenderable) {
        indicator.content = value ? "▼" : "▶";
      }
      titleContainer.backgroundColor = value ? "#2a2a2a" : undefined;
    }

    this.requestRender();
  }

  public get section(): AccordionSection {
    return this._section;
  }
}


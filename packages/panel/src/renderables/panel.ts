import {
  BoxRenderable,
  TextRenderable,
  type RenderContext,
  type Renderable,
} from "@opentui/core";
import { resolvePadding } from "@opentui-ui/utils";
import type { PanelOptions } from "../types";

export class PanelRenderable extends BoxRenderable {
  private _options: PanelOptions;
  private _titleRenderable: Renderable | null = null;
  private _contentContainer: BoxRenderable;
  private _collapsed: boolean;

  constructor(ctx: RenderContext, options: PanelOptions) {
    const padding = resolvePadding(options, { top: 1, right: 1, bottom: 1, left: 1 });

    super(ctx, {
      id: options.title ? `panel-${String(options.title)}` : "panel",
      flexDirection: "column",
      backgroundColor: options.backgroundColor,
      border: options.border ?? true,
      borderColor: options.borderColor,
      borderStyle: options.borderStyle,
      paddingTop: padding.top,
      paddingRight: padding.right,
      paddingBottom: padding.bottom,
      paddingLeft: padding.left,
      gap: 0,
    });

    this._options = options;
    this._collapsed = options.collapsed ?? false;

    // Create content container
    this._contentContainer = new BoxRenderable(ctx, {
      id: "panel-content",
      flexDirection: "column",
      visible: !this._collapsed,
    });

    // Add title if provided
    if (options.title) {
      this.createTitle(options.title);
    }

    // Add content
    this.addContent(options.content);

    // Add content container
    this.add(this._contentContainer);
  }

  private createTitle(title: string | Renderable): void {
    if (typeof title === "string") {
      this._titleRenderable = new TextRenderable(this.ctx, {
        id: "panel-title",
        content: title,
        fg: this._options.borderColor,
      });
    } else {
      this._titleRenderable = title;
    }

    if (this._titleRenderable) {
      this.add(this._titleRenderable, 0);
    }
  }

  private addContent(content: Renderable | Renderable[]): void {
    if (Array.isArray(content)) {
      for (const item of content) {
        this._contentContainer.add(item);
      }
    } else {
      this._contentContainer.add(content);
    }
  }

  public get collapsed(): boolean {
    return this._collapsed;
  }

  public set collapsed(value: boolean) {
    if (this._collapsed === value) return;

    this._collapsed = value;
    this._contentContainer.visible = !value;
    this._options.onToggle?.(value);
    this.requestRender();
  }

  public toggle(): void {
    this.collapsed = !this._collapsed;
  }

  public set title(value: string | Renderable | undefined) {
    if (this._titleRenderable) {
      this.remove(this._titleRenderable.id);
      this._titleRenderable.destroyRecursively();
      this._titleRenderable = null;
    }

    if (value) {
      this.createTitle(value);
      this.requestRender();
    }
  }

  public set content(value: Renderable | Renderable[]) {
    // Clear existing content
    const children = [...this._contentContainer.children];
    for (const child of children) {
      this._contentContainer.remove(child.id);
      child.destroyRecursively();
    }

    // Add new content
    this.addContent(value);
    this.requestRender();
  }

  public override destroy(): void {
    if (this._titleRenderable) {
      this._titleRenderable.destroyRecursively();
      this._titleRenderable = null;
    }
    this._contentContainer.destroyRecursively();
    super.destroy();
  }
}


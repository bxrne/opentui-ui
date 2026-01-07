import {
  BoxRenderable,
  TextRenderable,
  type RenderContext,
  type Renderable,
} from "@opentui/core";
import { DEFAULT_FOOTER_HEIGHT, FOOTER_Z_INDEX } from "../constants";
import type { FooterOptions } from "../types";

export class FooterRenderable extends BoxRenderable {
  private _options: FooterOptions;
  private _contentContainer: BoxRenderable;

  constructor(ctx: RenderContext, options: FooterOptions) {
    const height = options.height ?? DEFAULT_FOOTER_HEIGHT;

    super(ctx, {
      id: "footer",
      position: "absolute",
      left: 0,
      bottom: 0,
      width: ctx.width,
      height,
      backgroundColor: options.backgroundColor ?? "#1a1a1a",
      border: options.border ?? true,
      borderColor: options.borderColor,
      borderStyle: options.borderStyle,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 2,
      paddingRight: 2,
      zIndex: FOOTER_Z_INDEX,
    });

    this._options = options;

    // Create content container
    this._contentContainer = new BoxRenderable(ctx, {
      id: "footer-content",
      flexDirection: "row",
      alignItems: "center",
      gap: 1,
    });

    // Add content
    this.addContent(options.content);

    // Add content container
    this.add(this._contentContainer);
  }

  private addContent(content: string | Renderable | Renderable[]): void {
    if (typeof content === "string") {
      this._contentContainer.add(
        new TextRenderable(this.ctx, {
          id: "footer-text",
          content,
          fg: this._options.borderColor,
        }),
      );
    } else if (Array.isArray(content)) {
      for (const item of content) {
        this._contentContainer.add(item);
      }
    } else {
      this._contentContainer.add(content);
    }
  }

  public updateDimensions(width: number): void {
    this.width = width;
    this.requestRender();
  }

  public set content(value: string | Renderable | Renderable[]) {
    this._options.content = value;
    const children = [...this._contentContainer.children];
    for (const child of children) {
      this._contentContainer.remove(child.id);
      child.destroyRecursively();
    }
    this.addContent(value);
    this.requestRender();
  }

  public override destroy(): void {
    this._contentContainer.destroyRecursively();
    super.destroy();
  }
}


import {
  BoxRenderable,
  type RenderContext,
  type Renderable,
} from "@opentui/core";
import { DEFAULT_SPLIT } from "../constants";
import type { SplitPaneOptions } from "../types";

export class SplitPaneRenderable extends BoxRenderable {
  private _options: SplitPaneOptions;
  private _firstContainer: BoxRenderable;
  private _secondContainer: BoxRenderable;
  private _split: number;

  constructor(ctx: RenderContext, options: SplitPaneOptions) {
    const isHorizontal = options.direction === "horizontal";
    const split = options.split ?? DEFAULT_SPLIT;

    super(ctx, {
      id: "split-pane",
      flexDirection: isHorizontal ? "row" : "column",
      width: "100%",
      height: "100%",
      gap: 0,
    });

    this._options = options;
    this._split = split;

    // Calculate pane sizes
    const { firstSize, secondSize } = this.calculatePaneSizes(
      ctx,
      isHorizontal,
      split,
    );

    // Create first pane container
    this._firstContainer = new BoxRenderable(ctx, {
      id: "split-pane-first",
      width: isHorizontal ? firstSize : "100%",
      height: isHorizontal ? "100%" : firstSize,
      overflow: "hidden",
    });
    this._firstContainer.add(options.first);

    // Create second pane container
    this._secondContainer = new BoxRenderable(ctx, {
      id: "split-pane-second",
      width: isHorizontal ? secondSize : "100%",
      height: isHorizontal ? "100%" : secondSize,
      overflow: "hidden",
    });
    this._secondContainer.add(options.second);

    // Add containers
    this.add(this._firstContainer);
    this.add(this._secondContainer);
  }

  private calculatePaneSizes(
    ctx: RenderContext,
    isHorizontal: boolean,
    split: number,
  ): { firstSize: number; secondSize: number } {
    const totalSize = isHorizontal ? ctx.width : ctx.height;
    let firstSize: number;
    let secondSize: number;

    if (split <= 100 && split >= 0) {
      // Percentage
      firstSize = Math.floor((totalSize * split) / 100);
      secondSize = totalSize - firstSize;
    } else {
      // Pixels
      firstSize = Math.min(split, totalSize);
      secondSize = totalSize - firstSize;
    }

    // Apply min/max constraints
    if (this._options.minSize !== undefined) {
      firstSize = Math.max(firstSize, this._options.minSize);
      secondSize = totalSize - firstSize;
    }
    if (this._options.minSize2 !== undefined) {
      secondSize = Math.max(secondSize, this._options.minSize2);
      firstSize = totalSize - secondSize;
    }
    if (this._options.maxSize !== undefined) {
      firstSize = Math.min(firstSize, this._options.maxSize);
      secondSize = totalSize - firstSize;
    }
    if (this._options.maxSize2 !== undefined) {
      secondSize = Math.min(secondSize, this._options.maxSize2);
      firstSize = totalSize - secondSize;
    }

    return { firstSize, secondSize };
  }

  public updateDimensions(width: number, height?: number): void {
    const h = height ?? this._ctx.height;
    const isHorizontal = this._options.direction === "horizontal";
    const { firstSize, secondSize } = this.calculatePaneSizes(
      this._ctx,
      isHorizontal,
      this._split,
    );

    this._firstContainer.width = isHorizontal ? firstSize : "100%";
    this._firstContainer.height = isHorizontal ? "100%" : firstSize;
    this._secondContainer.width = isHorizontal ? secondSize : "100%";
    this._secondContainer.height = isHorizontal ? "100%" : secondSize;

    this.requestRender();
  }

  public get split(): number {
    return this._split;
  }

  public set split(value: number) {
    if (this._split === value) return;

    this._split = value;
    this.updateDimensions(this._ctx.width, this._ctx.height);
    this._options.onSplitChange?.(value);
  }

  public override destroy(): void {
    this._firstContainer.destroyRecursively();
    this._secondContainer.destroyRecursively();
    super.destroy();
  }
}


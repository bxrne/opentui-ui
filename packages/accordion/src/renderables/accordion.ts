import {
  BoxRenderable,
  type RenderContext,
} from "@opentui/core";
import { AccordionState } from "../state";
import type { AccordionOptions } from "../types";
import { AccordionSectionRenderable } from "./accordion-section";

export class AccordionRenderable extends BoxRenderable {
  private _options: AccordionOptions;
  private _state: AccordionState;
  private _sectionRenderables: Map<
    string | number,
    AccordionSectionRenderable
  > = new Map();
  private _unsubscribe: (() => void) | null = null;

  constructor(ctx: RenderContext, options: AccordionOptions) {
    super(ctx, {
      id: "accordion",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      gap: 0,
    });

    this._options = options;
    this._state = new AccordionState(
      options.sections,
      options.allowMultiple ?? false,
    );

    // Subscribe to state changes
    this._unsubscribe = this._state.subscribe((sections, openSections) => {
      this.updateSections(sections, openSections);
    });

    // Initial render
    this.updateSections(this._state.sections, this._state.openSections);
  }

  private updateSections(
    sections: typeof this._state.sections,
    openSections: Set<string | number>,
  ): void {
    // Remove all existing sections
    const children = [...this.children];
    for (const child of children) {
      this.remove(child.id);
      child.destroyRecursively();
    }
    this._sectionRenderables.clear();

    // Add sections
    for (const section of sections) {
      const isOpen = openSections.has(section.id);
      const sectionRenderable = new AccordionSectionRenderable(this.ctx, {
        section,
        open: isOpen,
        onToggle: () => {
          this._state.toggle(section.id);
          const newOpen = this._state.isOpen(section.id);
          this._options.onSectionToggle?.(section.id, newOpen);
        },
      });
      this._sectionRenderables.set(section.id, sectionRenderable);
      this.add(sectionRenderable);
    }

    this.requestRender();
  }

  public override destroy(): void {
    this._unsubscribe?.();
    super.destroy();
  }
}


import type { AccordionSection } from "./types";

export class AccordionState {
  private _sections: Map<string | number, AccordionSection> = new Map();
  private _openSections: Set<string | number> = new Set();
  private _allowMultiple: boolean;
  private _subscribers: Set<
    (sections: AccordionSection[], openSections: Set<string | number>) => void
  > = new Set();

  constructor(sections: AccordionSection[], allowMultiple: boolean = false) {
    this._allowMultiple = allowMultiple;
    for (const section of sections) {
      this._sections.set(section.id, section);
      if (section.defaultOpen) {
        this._openSections.add(section.id);
      }
    }
  }

  public get sections(): AccordionSection[] {
    return Array.from(this._sections.values());
  }

  public get openSections(): Set<string | number> {
    return new Set(this._openSections);
  }

  public isOpen(id: string | number): boolean {
    return this._openSections.has(id);
  }

  public toggle(id: string | number): void {
    if (this._openSections.has(id)) {
      this._openSections.delete(id);
    } else {
      if (!this._allowMultiple) {
        // Close all other sections
        this._openSections.clear();
      }
      this._openSections.add(id);
    }
    this.notify();
  }

  public subscribe(
    callback: (
      sections: AccordionSection[],
      openSections: Set<string | number>,
    ) => void,
  ): () => void {
    this._subscribers.add(callback);
    return () => {
      this._subscribers.delete(callback);
    };
  }

  private notify(): void {
    const sections = this.sections;
    const openSections = this.openSections;
    for (const callback of this._subscribers) {
      callback(sections, openSections);
    }
  }
}


#!/usr/bin/env bun
/**
 * Basic Status Bar Example
 *
 * Demonstrates the status bar component with @opentui/core.
 * Run with: bun packages/status-bar/examples/basic-status-bar.ts
 */

import {
  BoxRenderable,
  type CliRenderer,
  createCliRenderer,
  type KeyEvent,
  TextRenderable,
} from "@opentui/core";

import { StatusBarRenderable } from "../src/index";

let renderer: CliRenderer | null = null;
let statusBar: StatusBarRenderable | null = null;
let counter = 0;

function createUI(rendererInstance: CliRenderer): void {
  renderer = rendererInstance;
  renderer.setBackgroundColor("#1a1a2e");

  const mainContainer = new BoxRenderable(renderer, {
    id: "main",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 2,
    gap: 1,
  });

  const title = new TextRenderable(renderer, {
    id: "title",
    content: "Status Bar Demo",
    fg: "#e94560",
  });
  mainContainer.add(title);

  const content = new TextRenderable(renderer, {
    id: "content",
    content: "Press 'u' to update status | Press 'q' to quit",
    fg: "#a0a0a0",
  });
  mainContainer.add(content);

  renderer.root.add(mainContainer);

  // Create status bar
  statusBar = new StatusBarRenderable(renderer, {
    left: new TextRenderable(renderer, { content: "Status: Ready" }),
    center: new TextRenderable(renderer, { content: "Press U to update" }),
    right: new TextRenderable(renderer, { content: `Counter: ${counter}` }),
    backgroundColor: "#1a1a1a",
    border: true,
  });
  renderer.root.add(statusBar);

  // Set up keyboard handler
  renderer.keyInput.on("keypress", (evt: KeyEvent) => {
    const key = evt.name;
    switch (key) {
      case "u":
        counter++;
        if (statusBar) {
          statusBar.left = new TextRenderable(renderer, {
            content: `Status: Updated (${counter})`,
          });
          statusBar.right = new TextRenderable(renderer, {
            content: `Counter: ${counter}`,
          });
        }
        break;
      case "q":
        renderer?.destroy();
        break;
    }
  });
}

createCliRenderer({
  onInit: createUI,
  onResize: (width) => {
    statusBar?.updateDimensions(width);
  },
});


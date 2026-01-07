#!/usr/bin/env bun
/**
 * Basic Panel Example
 *
 * Demonstrates the panel component with @opentui/core.
 * Run with: bun packages/panel/examples/basic-panel.ts
 */

import {
  BoxRenderable,
  type CliRenderer,
  createCliRenderer,
  type KeyEvent,
  TextRenderable,
} from "@opentui/core";

import { PanelRenderable } from "../src/index";

let renderer: CliRenderer | null = null;

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
    content: "Panel Demo",
    fg: "#e94560",
  });
  mainContainer.add(title);

  // Create a panel with title and content
  const panel = new PanelRenderable(renderer, {
    title: "My Panel",
    content: new TextRenderable(renderer, {
      content: "This is panel content!\nYou can put any renderable here.",
      wrapMode: "word",
    }),
    backgroundColor: "#262626",
    border: true,
    padding: 1,
  });
  mainContainer.add(panel);

  // Create a collapsible panel
  const collapsiblePanel = new PanelRenderable(renderer, {
    title: "Collapsible Panel",
    content: new TextRenderable(renderer, {
      content: "This panel can be collapsed!",
    }),
    collapsible: true,
    collapsed: false,
    backgroundColor: "#262626",
    border: true,
    padding: 1,
  });
  mainContainer.add(collapsiblePanel);

  const helpText = new TextRenderable(renderer, {
    id: "help",
    content: "Press 'c' to toggle collapsible panel | Press 'q' to quit",
    fg: "#a0a0a0",
  });
  mainContainer.add(helpText);

  renderer.root.add(mainContainer);

  // Set up keyboard handler
  renderer.keyInput.on("keypress", (evt: KeyEvent) => {
    const key = evt.name;
    switch (key) {
      case "c":
        collapsiblePanel.toggle();
        break;
      case "q":
        renderer?.destroy();
        break;
    }
  });
}

createCliRenderer({
  onInit: createUI,
  onResize: (width, height) => {
    // Handle resize if needed
  },
});


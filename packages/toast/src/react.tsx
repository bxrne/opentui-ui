/** @jsxImportSource @opentui/react */

import { extend } from "@opentui/react";
import { ToasterRenderable } from "./renderables";
import type { ToasterOptions } from "./types";

// Add TypeScript support
declare module "@opentui/react" {
  interface OpenTUIComponents {
    toaster: typeof ToasterRenderable;
  }
}

// Register the toaster component
extend({ toaster: ToasterRenderable });

export function Toaster(props: ToasterOptions) {
  return <toaster {...props} />;
}

export { toast } from "./state";

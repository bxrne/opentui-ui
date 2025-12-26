/**
 * Style utilities for toast rendering
 *
 * Handles style merging and padding resolution.
 */

import { DEFAULT_TOAST_OPTIONS } from "../constants";
import type { ToastOptions, ToastStyle, ToastType } from "../types";

/**
 * Resolved padding values (all four sides)
 */
export interface ResolvedPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Resolve padding values with shorthand support
 *
 * Priority: specific > axis shorthand > uniform
 * e.g., paddingLeft > paddingX > padding
 *
 * @example
 * ```ts
 * resolvePadding({ padding: 1 })
 * // => { top: 1, right: 1, bottom: 1, left: 1 }
 *
 * resolvePadding({ paddingX: 2, paddingY: 1 })
 * // => { top: 1, right: 2, bottom: 1, left: 2 }
 *
 * resolvePadding({ padding: 1, paddingLeft: 3 })
 * // => { top: 1, right: 1, bottom: 1, left: 3 }
 * ```
 */
export function resolvePadding(style: ToastStyle): ResolvedPadding {
  const x = style.padding ?? style.paddingX ?? 0;
  const y = style.padding ?? style.paddingY ?? 0;

  return {
    top: style.paddingTop ?? y,
    right: style.paddingRight ?? x,
    bottom: style.paddingBottom ?? y,
    left: style.paddingLeft ?? x,
  };
}

/**
 * Merge multiple ToastStyle objects (later wins)
 *
 * Uses shallow Object.assign, so later styles completely
 * override earlier values for the same property.
 *
 * @example
 * ```ts
 * mergeStyles(
 *   { borderColor: "red", padding: 1 },
 *   { borderColor: "blue" }
 * )
 * // => { borderColor: "blue", padding: 1 }
 * ```
 */
export function mergeStyles(
  ...styles: (Partial<ToastStyle> | undefined)[]
): ToastStyle {
  const result: ToastStyle = {};

  for (const style of styles) {
    if (!style) continue;
    Object.assign(result, style);
  }

  return result;
}

/**
 * Compute the final style for a toast by merging all style layers
 *
 * Merges styles in order of increasing specificity:
 * 1. DEFAULT_TOAST_OPTIONS.style (sensible defaults)
 * 2. DEFAULT_TOAST_OPTIONS[type].style (default type colors)
 * 3. toastOptions.style (user's global style)
 * 4. toastOptions[type].style (user's type-specific overrides)
 * 5. toastStyle (per-toast inline style from toast() call)
 *
 * @example
 * ```ts
 * computeToastStyle("success", { style: { paddingX: 2 }, success: { style: { borderColor: "green" } } })
 * ```
 */
export function computeToastStyle(
  type: ToastType,
  toastOptions?: ToastOptions,
  toastStyle?: Partial<ToastStyle>,
): ToastStyle {
  // Default styles
  const defaultBaseStyle = DEFAULT_TOAST_OPTIONS.style;
  const defaultTypeStyle = DEFAULT_TOAST_OPTIONS[type]?.style;

  // User-provided styles from toastOptions
  const userBaseStyle = toastOptions?.style;
  const userTypeStyle = toastOptions?.[type]?.style;

  const computedStyle = mergeStyles(
    defaultBaseStyle,
    defaultTypeStyle,
    userBaseStyle,
    userTypeStyle,
    toastStyle,
  );

  // If border is false, clear borderStyle and borderColor for cleaner config
  if (computedStyle.border === false) {
    delete computedStyle.borderStyle;
    delete computedStyle.borderColor;
  }

  return computedStyle;
}

/**
 * Compute the duration for a toast
 *
 * Priority: toast.duration > toastOptions[type].duration > toastOptions.duration > DEFAULT
 */
export function computeToastDuration(
  type: ToastType,
  toastOptions?: ToastOptions,
  toastDuration?: number,
): number {
  // Per-toast duration takes highest priority
  if (toastDuration !== undefined) {
    return toastDuration;
  }

  // Type-specific duration from toastOptions
  const typeDuration = toastOptions?.[type]?.duration;
  if (typeDuration !== undefined) {
    return typeDuration;
  }

  // Global duration from toastOptions
  if (toastOptions?.duration !== undefined) {
    return toastOptions.duration;
  }

  // Default
  return DEFAULT_TOAST_OPTIONS.duration;
}

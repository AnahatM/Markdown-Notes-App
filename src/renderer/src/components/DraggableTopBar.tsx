import { JSX } from "react";

/**
 * DraggableTopBar component for the application layout.
 * It provides a transparent header that can be used for dragging the window.
 *
 * @returns JSX.Element representing the draggable top bar.
 */
export const DraggableTopBar = (): JSX.Element => {
  return <header className="draggable absolute inset-0 h-8 bg-transparent" />;
};

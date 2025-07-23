import { ComponentProps, forwardRef, JSX } from "react";
import { twMerge } from "tailwind-merge";

/**
 * RootLayout component for the application layout.
 * It provides a full-screen flex container for the main content.
 *
 * @param className - Additional CSS classes to apply to the root layout.
 * @param children - The content to be rendered inside the root layout.
 * @param props - Additional properties to pass to the main element.
 * @returns JSX.Element representing the root layout.
 */
export const RootLayout = ({
  children,
  className,
  ...props
}: ComponentProps<"main">): JSX.Element => {
  return (
    <main className={twMerge("flex flex-row h-screen", className)} {...props}>
      {children}
    </main>
  );
};

/**
 * Sidebar component for the application layout.
 * It provides a fixed-width sidebar with overflow handling.
 *
 * @param className - Additional CSS classes to apply to the sidebar.
 * @param children - The content to be rendered inside the sidebar.
 * @param props - Additional properties to pass to the aside element.
 * @returns JSX.Element representing the sidebar.
 */
export const Sidebar = ({
  className,
  children,
  ...props
}: ComponentProps<"aside">): JSX.Element => {
  const isMac = typeof navigator !== "undefined" && /Macintosh|Mac OS X/.test(navigator.userAgent);
  return (
    <aside
      className={twMerge(
        "w-[250px] " + (isMac ? "mt-10 " : "") + "h-[100vh+10px] overflow-auto",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

/**
 * Content component for the application layout.
 * Will contain the main note and editor area.
 * It provides a flexible area that can grow and shrink with the content.
 *
 * @param className - Additional CSS classes to apply to the content area.
 * @param children - The content to be rendered inside the content area.
 * @param props - Additional properties to pass to the div element.
 * @returns JSX.Element representing the content area.
 */
export const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge("flex-1 overflow-auto", className)} {...props}>
      {children}
    </div>
  )
);

// Set required display name for the Content component
Content.displayName = "Content";

import { ComponentProps, JSX, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ActionButtonProps = ComponentProps<"button"> & {
  icon?: ReactNode;
  label?: string;
};

/**
 * ActionButton component
 * This component renders a button with specific styles and supports icon + label layout.
 * It merges the provided className with default styles using tailwind-merge.
 *
 * @param props - Props for the button including icon and label
 * @returns ActionButton JSX Element
 */
export const ActionButton = ({
  className,
  children,
  icon,
  label,
  ...props
}: ActionButtonProps): JSX.Element => {
  return (
    <button
      className={twMerge(
        "w-full px-3 py-2 rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100 flex items-center gap-2",
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label && <span className="text-left text-sm text-zinc-300">{label}</span>}
      {children}
    </button>
  );
};

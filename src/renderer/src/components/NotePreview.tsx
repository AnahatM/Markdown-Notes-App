import { cn, formatDateFromMs } from "@renderer/utils";
import { NoteInfo } from "@shared/models";
import { ComponentProps, JSX } from "react";

export type NotePreviewProps = NoteInfo & {
  /** Indicates if the note is currently active */
  isActive?: boolean;
} & ComponentProps<"div">;

export const NotePreview = ({
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  content,
  lastEditTimeMs,
  isActive = false,
  className,
  ...props
}: NotePreviewProps): JSX.Element => {
  // Get formatted date from lastEditTimeMs
  const date: string = formatDateFromMs(lastEditTimeMs);

  return (
    <div
      className={cn(
        "cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75",
        { "bg-zinc-700/75": isActive, "hover:bg-zinc-600/75": !isActive },
        className
      )}
      {...props}
    >
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
    </div>
  );
};

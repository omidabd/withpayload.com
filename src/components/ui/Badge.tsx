import { ReactNode } from "react";

import clsx from "clsx";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
  hoverable?: boolean;
  size?: "sm" | "base";
}

export const Badge = ({
  children,
  className = "",
  active = false,
  hoverable = false,
  size = "sm",
}: BadgeProps) => {
  return (
    <div
      className={clsx(
        "text-gray-700 rounded-full font-semibold",
        {
          "bg-gray-200": !active,
          "bg-gray-500 text-white": active,
          "hover:bg-gray-500 transition-colors duration-200 hover:text-white":
            hoverable,
          "px-2 py-0.5 text-xs": size === "sm",
          "px-4 py-1.5 text-sm": size === "base",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

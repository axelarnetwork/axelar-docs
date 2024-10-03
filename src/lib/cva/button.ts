import { cva } from "class-variance-authority";

export type variants = "primary" | "outline" | "secondary";

export const buttonCva = cva(
  " relative rounded-[60px] hover:rounded-xl    transition-all   duration-500 ease-in-out font-clash",
  {
    variants: {
      intent: {
        primary: ["bg-primary", "text-white", "border-transparent", ""],
        outline: [
          "border",
          "text-foreground",
          "border-foreground",
          "hover:bg-primary",
          "hover:text-white",
          "hover:border-primary",
        ],
        secondary: [
          "bg-white",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
      },
      size: {
        small: ["text-sm", "py-1.5", "px-4"],
        medium: "px-16 py-2.5 text-sm ",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        size: "medium",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  },
);

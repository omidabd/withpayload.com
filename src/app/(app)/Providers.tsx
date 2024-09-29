"use client";

import { ReactNode } from "react";

import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from "@mantine/core";

const brand: MantineColorsTuple = [
  "#f3f3fe",
  "#e4e6ed",
  "#c8cad3",
  "#a9adb9",
  "#9093a4",
  "#808496",
  "#000",
  "#656a7e",
  "#585e72",
  "#4a5167",
];

const theme = createTheme({
  colors: {
    brand,
  },
  defaultRadius: "md",
});

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);

import type { ReactNode, ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";

import { ThemeProvider } from "../contexts/theme-context";

function AllProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

function customRender(
  ui: ReactElement,
  options?: RenderOptions
) {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
}

export * from "@testing-library/react";
export { customRender as render };
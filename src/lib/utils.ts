import { clsx, type ClassValue } from "clsx";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useActivityEnabled() {
  const queryClient = useQueryClient();
  const [activityEnabled, _setActivityEnabled] = useQueryState(
    "activityEnabled",
    parseAsBoolean.withDefault(false)
  );

  const setActivityEnabled = (value: boolean) => {
    queryClient.clear();
    _setActivityEnabled(value);
  };

  return [activityEnabled, setActivityEnabled] as const;
}

export function useSuspenseEnabled() {
  const queryClient = useQueryClient();
  const [suspenseEnabled, _setSuspenseEnabled] = useQueryState(
    "activitySuspending",
    parseAsBoolean.withDefault(false)
  );

  const setSuspenseEnabled = (value: boolean) => {
    queryClient.clear();
    _setSuspenseEnabled(value);
  };

  return [suspenseEnabled, setSuspenseEnabled] as const;
}

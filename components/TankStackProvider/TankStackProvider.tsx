'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

interface TankStackProviderProps {
  children: React.ReactNode;
}

export default function TankStackProvider({
  children,
}: TankStackProviderProps) {
  const [queryClien] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClien}>{children}</QueryClientProvider>
  );
}

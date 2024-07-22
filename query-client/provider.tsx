"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  useEffect(() => {}, []);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;

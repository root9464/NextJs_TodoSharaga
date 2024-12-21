'use client';

import { NextUIProvider } from '@nextui-org/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { init } from '@telegram-apps/sdk-react';
import eruda from 'eruda';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

init();

eruda.init();

export const GlobalProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
};

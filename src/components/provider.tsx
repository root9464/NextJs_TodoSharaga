'use client';

import '@/shared/utils/mock';
import { NextUIProvider } from '@nextui-org/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { init as initSDK } from '@telegram-apps/sdk-react';
import { ReactNode } from 'react';

const queryClient = new QueryClient();
export const GlobalProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  initSDK();
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
};

'use client';

import { useClientOnce } from '@/shared/hooks/useClientOnce';
import '@/shared/utils/mock';
import { NextUIProvider } from '@nextui-org/system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { $debug, backButton, initData, init as initSDK, miniApp, themeParams } from '@telegram-apps/sdk-react';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  // Mount all components used in the project.
  backButton.isSupported() && backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
}

export const GlobalProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  useClientOnce(() => {
    init(false);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
};

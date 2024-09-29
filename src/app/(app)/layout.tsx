import { ColorSchemeScript } from "@mantine/core";

import "./globals.css";
import "@mantine/core/styles.css";

import { ReactNode } from "react";

import { getGlobalSettings } from "@/_features/globals/actions";
import { AppLayout } from "@/app/(app)/AppLayout";
import { Providers } from "@/app/(app)/Providers";
import { GoogleAnalytics, Umami } from "@/components/Analytics";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout = async ({ children }: LayoutProps) => {
  const { analytics } = await getGlobalSettings();

  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>

      {analytics?.googleAnalyticsId && (
        <GoogleAnalytics id={analytics.googleAnalyticsId} />
      )}
      {analytics?.umami?.umamiWebsiteId && analytics?.umami?.umamiSrc && (
        <Umami
          id={analytics.umami.umamiWebsiteId}
          src={analytics.umami.umamiSrc}
        />
      )}

      <script async src="https://tally.so/widgets/embed.js"></script>

      <body>
        <Toaster />

        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;

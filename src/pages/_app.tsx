import { type AppType } from "next/app";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Shell from "~/components/Shell";

const MyApp: AppType = ({ Component, pageProps }) => {
  const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
  });
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={myCache}
        theme={{
          colorScheme: "dark",
        }}
      >
        <Shell>
          <Component {...pageProps} />
        </Shell>
      </MantineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);

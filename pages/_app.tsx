import {
    createDOMRenderer,
    FluentProvider,
    GriffelRenderer,
    SSRProvider,
    RendererProvider,
    webLightTheme,
} from "@fluentui/react-components";
import type { AppProps } from "next/app";
import React from "react";
import ThemeProvider from "../components/ThemeProvider";

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

// This is needed since SSRProvider's children property has incorrect type definition.
// Maybe caused by version's mismatch between next.js/react with Fluent UI.
const Ssr = SSRProvider as React.FC<React.PropsWithChildren<{}>>;

function MyApp({ Component, pageProps, renderer }: EnhancedAppProps) {
    return (
        // 👇 Accepts a renderer from <Document /> or creates a default one
        //    Also triggers rehydration a client
        <RendererProvider renderer={renderer || createDOMRenderer()}>
            <Ssr>
                <ThemeProvider>
                    <Component {...pageProps} />
                </ThemeProvider>
            </Ssr>
        </RendererProvider>
    );
}

export default MyApp;

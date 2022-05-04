import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../utility/emotionCache'

export default class CustomDocument extends Document {
        render() {
        return (
            <Html lang="en">
                <Head>
                <meta name='application-name' content='Jet Mandarin' />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content='Jet Mandarin' />
                <meta name='description' content='An appointment tracker and CRM for appointment based businesses' />
                <meta name='format-detection' content='telephone=no' />
                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='theme-color' content='#121212' />

                <link rel='manifest' href="/manifest.json" />
                <link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.png" />
                <link rel='icon' type='image/png' sizes='32x32' href='/images/icons/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/images/icons/favicon-16x16.png' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

CustomDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage

    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    /* eslint-disable */

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    return <App emotionCache={cache} { ...props } />
                }
        })
    /* eslint-enable */

    const initialProps = await Document.getInitialProps(ctx)
    // Prevent emotion from rendering invalid HTML
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style, index) => (
        <style
        key={index}
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ))

    return {
        ...initialProps,
        // Render styles fragments after app and page finish rendering
        styles: [
            ...React.Children.toArray(initialProps.styles),
            ...emotionStyleTags
        ]
    }
}
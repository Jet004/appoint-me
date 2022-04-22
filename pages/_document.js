import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../utility/emotionCache'

export default class CustomDocument extends Document {
        render() {
        return (
            <Html lang="en">
                <Head>
                    
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
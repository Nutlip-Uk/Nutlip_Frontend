import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          defer
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initmap`}
        ></script>
      </body>
    </Html>
  )
}

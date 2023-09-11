import Head from "next/head";
import "styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Poppins:400,500,700&display=swap"
        />
      </Head>
      <div className="bg-gray-950 min-h-screen font-poppins">{children}</div>
    </>
  );
}

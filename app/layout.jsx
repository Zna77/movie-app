import "@styles/globals.css";
import { Header } from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 h-screen font-roboto">
        <Header />
        <main>
          <div></div>
          {children}
        </main>
      </body>
    </html>
  );
}

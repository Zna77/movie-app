import "styles/globals.css";

export const metadata = {
  title: "Movies App",
  description: "Discover and share your favorite movies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 min-h-screen font-poppins">{children}</body>
    </html>
  );
}

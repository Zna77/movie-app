import "@styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-950 h-screen font-poppins">{children}</body>
    </html>
  );
}

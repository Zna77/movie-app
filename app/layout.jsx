import "styles/globals.css";

export const metadata = {
  title: "Movies App",
  description: "Discover and share your favorite movies.",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth scrollbar-thin scrollbar-thumb-gray-500 overflow-y-scroll "
    >
      <body className="bg-gray-900 min-h-screen font-poppins">{children}</body>
    </html>
  );
}

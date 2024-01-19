import "./globals.css";

export const metadata = {
  title: "Zepto-Assignment",
  description: "Chip Input Component Using NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

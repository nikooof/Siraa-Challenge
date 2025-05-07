export const metadata = {
  title: "Siraa Parser",
  description:
    "Automating property data extraction from brochures and floor plans",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}

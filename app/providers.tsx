import NextThemeProvider from "@/providers/NextThemesProvider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NextThemeProvider>{children}</NextThemeProvider>;
}

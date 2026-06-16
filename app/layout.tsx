import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import { I18nProvider } from "@/i18n/I18nContext";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreamFlow — Smart Workflow Automation Platform",
  description:
    "StreamFlow transforms repetitive manual tasks into automated workflows. 200+ integrations, zero-code editor, enterprise security. Start free.",
  keywords: ["workflow automation", "SaaS", "no-code", "automation platform", "StreamFlow"],
  openGraph: {
    title: "StreamFlow — Smart Workflow Automation Platform",
    description:
      "Transform repetitive tasks into automated workflows. 200+ integrations, zero-code, enterprise-grade security.",
    type: "website",
    locale: "zh_CN",
    siteName: "StreamFlow",
  },
};

// Inline script to prevent flash of wrong theme (FOUC prevention)
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('streamflow-theme');
    var isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${poppins.variable} ${openSans.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

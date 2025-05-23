import "./globals.css";
import Provider from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  );
}

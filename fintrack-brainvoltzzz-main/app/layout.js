import Provider from "@/components/Provider";
import "@/Styles/globals.css";

export const metadata = {
  title: "FinTrack financial management app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
}

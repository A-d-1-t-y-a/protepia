import Navbar from "@app/components/Navbar";
import Provider from "@app/components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "protepia",
  description: "this is an ai based platform",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="max-w-6xl mx-auto relative z-10">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;

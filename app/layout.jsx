import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import "@styles/global.css";

export const metadata = {
  title: "protepia",
  description: "this is an ai based platform",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="max-w-6xl mx-auto relative z-10">
            <Navbar />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}

export default RootLayout;

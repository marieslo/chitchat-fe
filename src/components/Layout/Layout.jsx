import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Layout.css'

export default function Layout() {
  return (
    <div className="gridContainer">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* <Footer /> */}
      </footer>
    </div>
  )
}

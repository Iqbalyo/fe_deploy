import { useContext, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom"; //! Tambahkan useLocation,Tambahkan useLocation dari react-router-dom dan gunakan URL saat ini untuk menentukan menu mana yang aktif.
import { ThemeContext } from "../../context/ThemeContext";
import { SidebarContext } from "../../context/SidebarContext";
import {
  MdOutlineAttachMoney,
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlinePeople,
  MdSchool,
} from "react-icons/md";
import Logounama from "../../assets/images/unama.png";
import "./Sidebar.scss";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext); // Ambil state & fungsi dari context
  const location = useLocation(); // Gunakan useLocation

  // Fungsi untuk menutup sidebar jika diklik di luar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      !event.target.classList.contains("sidebar-toggle-btn")
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img
            src={Logounama}
            alt="UNAMA Logo"
            width={40}
            style={{
              backgroundColor: "#ffffff",
              padding: "5px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
          <span className="sidebar-brand-text">UNAMA</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/"
                className={`menu-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                 onClick={() => closeSidebar()} 
              >
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dasboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/informasikehadiran"
                className={`menu-link ${
                  location.pathname === "/informasikehadiran" ? "active" : ""
                }`}
              >
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Informasi Kehadiran</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/ipk"
                className={`menu-link ${
                  location.pathname === "/ipk" ? "active" : ""
                }`}
              >
                <span className="menu-link-icon">
                  <MdSchool size={18} />
                </span>
                <span className="menu-link-text">IPK</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/informasiukt"
                className={`menu-link ${
                  location.pathname === "/informasiukt" ? "active" : ""
                }`}
              >
                <span className="menu-link-icon">
                  <MdOutlineAttachMoney size={20} />
                </span>
                <span className="menu-link-text">Biaya Kuliah</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/logout"
                className={`menu-link ${
                  location.pathname === "/logout" ? "active" : ""
                }`}
              >
                {/* <span className="menu-link-icon">
                  <MdOutlineClose size={20} />
                </span>
                <span className="menu-link-text">Logout</span> */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

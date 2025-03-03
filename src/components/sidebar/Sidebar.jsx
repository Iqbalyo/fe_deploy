import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
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
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Fungsi untuk update state saat ukuran layar berubah
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fungsi untuk menutup sidebar jika diklik di luar area pada mobile
  const handleClickOutside = (event) => {
    if (
      isMobile &&
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMobile]);

  return (
    <nav
      className={`sidebar ${isSidebarOpen || !isMobile ? "sidebar-show" : ""}`}
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
        {isMobile && (
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <MdOutlineClose size={24} />
          </button>
        )}
      </div>
      <div className="sidebar-body">
        <ul className="menu-list">
          <li className="menu-item">
            <Link
              to="/"
              className={`menu-link ${location.pathname === "/" ? "active" : ""}`}
            >
              <span className="menu-link-icon">
                <MdOutlineGridView size={18} />
              </span>
              <span className="menu-link-text">Dashboard</span>
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to="/informasikehadiran"
              className={`menu-link ${location.pathname === "/informasikehadiran" ? "active" : ""}`}
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
              className={`menu-link ${location.pathname === "/ipk" ? "active" : ""}`}
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
              className={`menu-link ${location.pathname === "/informasiukt" ? "active" : ""}`}
            >
              <span className="menu-link-icon">
                <MdOutlineAttachMoney size={20} />
              </span>
              <span className="menu-link-text">Biaya Kuliah</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

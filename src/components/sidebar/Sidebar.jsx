import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
// import { SidebarContext } from "../../context/SidebarContext"; // Import SidebarContext
import { MdOutlineAttachMoney, MdOutlineClose, MdOutlineGridView, MdOutlinePeople, MdSchool } from "react-icons/md";
import Logounama from "../../assets/images/unama.png";
import "./Sidebar.scss";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext); // Ambil state & fungsi dari context
  const location = useLocation();

  return (
    <nav className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}>
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
              <Link to="/" className={`menu-link ${location.pathname === "/" ? "active" : ""}`} onClick={closeSidebar}>
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/informasikehadiran" className={`menu-link ${location.pathname === "/informasikehadiran" ? "active" : ""}`} onClick={closeSidebar}>
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Informasi Kehadiran</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

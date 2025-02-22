import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAbsensiById } from "../../../store/action/userData.action";
import { useNavigate } from "react-router-dom";
import "./TableKehadiran.scss"; // Menggunakan SCSS

const TableKehadiran = () => {
  const nim = localStorage.getItem("nim");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { absen } = useSelector((state) => state.data);

  useEffect(() => {
    if (nim) {
      dispatch(getAbsensiById(nim));
    }
  }, [dispatch, nim]);

  return (
    <div className="kehadiran-container">
      <h2 className="kehadiran-title">Rekap Kehadiran</h2>
      <div className="kehadiran-list">
        {absen && absen.length > 0 ? (
          absen.map((row, index) => (
            <div
              key={index}
              className="kehadiran-item"
              onClick={() => navigate(`/informasi-kehadiran/${row.matakuliah_nama}`)}
            >
              <div className="mata-kuliah-container">
                <AccountCircleIcon className="user-icon" />
                <span className="mata-kuliah">{row.matakuliah_nama}</span>
              </div>

              <div className="info-kehadiran">
                <div className="status-group">
                  <span className="hadir">{row.hadir} x Hadir</span>
                  {row.izin > 0 && <span className="izin">{row.izin} x Izin</span>}
                  {row.tanpaKeterangan > 0 && (
                    <span className="alpha">{row.tanpaKeterangan} x Tanpa Keterangan</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">Tidak ada data absensi</p>
        )}
      </div>
    </div>
  );
};

export default TableKehadiran;

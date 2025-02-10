import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAbsensiById } from "../../../store/action/userData.action";
import "./TableKehadiran.scss"; // Menggunakan SCSS

const TableKehadiran = () => {
  const nim = localStorage.getItem("nim");
  const dispatch = useDispatch();
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
            <div key={index} className="kehadiran-item">
              <span className="mata-kuliah">{row.matakuliah_nama}</span>
              <div className="info-kehadiran">
                <span className="hadir">Hadir: {row.hadir}</span>
                <span className="izin">Izin: {row.izin}</span>
                <span className="alpha">Tanpa Keterangan: {row.tanpaKeterangan}</span>
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

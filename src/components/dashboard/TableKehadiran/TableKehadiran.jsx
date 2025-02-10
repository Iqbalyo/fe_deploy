import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAbsensiById } from '../../../store/action/userData.action';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ListItemButton from '@mui/material/ListItemButton';
import styles from './TableKehadiran.module.css';

const TableKehadiran = () => {
  const nim = localStorage.getItem('nim');
  const dispatch = useDispatch();
  const { absen, currentSemester, currentPeriode, lastSemester } = useSelector((state) => state.data);
  
  useEffect(() => {
    if (nim) {
      dispatch(getAbsensiById(nim));
    }
  }, [dispatch, nim]);

  return (
    <Paper className={styles.container}>
      {currentSemester && currentPeriode && lastSemester && (
        <div className={styles.semesterInfo}>
          <Typography variant="h6">
            Semester: {lastSemester} ({currentSemester}) - Periode: {currentPeriode}
          </Typography>
        </div>
      )}
      <List>
        {absen && absen.length > 0 ? (
          absen.map((row, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemButton component={Link} to={`/informasi-kehadiran/${row.matakuliah_nama}`}>
                <ListItemText
                  primary={row.matakuliah_nama}
                  secondary={
                    <>
                      
                      <Typography variant="body2">Hadir: {row.hadir}</Typography>
                      <Typography variant="body2">Izin: {row.izin}</Typography>
                      <Typography variant="body2">Tanpa Keterangan: {row.tanpaKeterangan}</Typography>
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" align="center">
            Tidak ada data absensi
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default TableKehadiran;

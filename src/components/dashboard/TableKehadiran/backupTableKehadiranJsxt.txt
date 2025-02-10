import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAbsensiById } from '../../../store/action/userData.action';
import styles from './TableKehadiran.module.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: '16px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
  },
  '&.clickable': {
    color: theme.palette.common.black,
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TableKehadiran = () => {
  const nim = localStorage.getItem('nim');
  const dispatch = useDispatch();

  const { absen, currentSemester, currentPeriode, lastSemester } = useSelector((state) => state.data);

  // State untuk pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State untuk modal dan data kehadiran detail
  const [openModal, setOpenModal] = useState(false);
  const [detailedAbsensi, setDetailedAbsensi] = useState([]);

  useEffect(() => {
    if (nim) {
      dispatch(getAbsensiById(nim));
    }
  }, [dispatch, nim]);

  // Pagination handler
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Data untuk halaman saat ini
  const paginatedData = absen?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Fungsi untuk menangani klik pada nama mata kuliah
  const handleRowClick = async (row) => {
    const nim = localStorage.getItem('nim'); // Ambil NIM dari localStorage
    try {
      const response = await fetch(`/monitoring/unama/v1/informasi-kehadiran/${row.matakuliah_nama}?nim=${nim}`);
      const data = await response.json();
      console.log("Data Kehadiran:", data);
      // Tampilkan data kehadiran sesuai kebutuhan, misalnya dengan modal atau komponen baru
    } catch (error) {
      console.error("Error fetching informasi kehadiran:", error);
    }
  };

  return (
    <TableContainer component={Paper} className={styles.container}>
      {currentSemester && currentPeriode && lastSemester && (
        <div className={styles.semesterInfo}>
          <Typography variant="h6">
            Semester: {lastSemester} ({currentSemester}) - Periode: {currentPeriode}
          </Typography>
        </div>
      )}
      <Table sx={{ minWidth: 700 }} aria-label="tabel kehadiran">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Nama Mata Kuliah</StyledTableCell>
            <StyledTableCell align="center">Jumlah Pertemuan Terakhir</StyledTableCell>
            <StyledTableCell align="center">Hadir</StyledTableCell>
            <StyledTableCell align="center">Izin</StyledTableCell>
            <StyledTableCell align="center">Tanpa Keterangan</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData && paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
                <StyledTableCell
                  component={Link} // Ganti StyledTableCell dengan Link
                  to={`/informasi-kehadiran/${row.matakuliah_nama}`} // Rute yang dituju
                  className="clickable"
                >
                  {row.matakuliah_nama}
                </StyledTableCell>
                <StyledTableCell align="center">{row.pertemuan_terakhir}</StyledTableCell>
                <StyledTableCell align="center">{row.hadir}</StyledTableCell>
                <StyledTableCell align="center">{row.izin}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.tanpaKeterangan}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center">
                Tidak ada data absensi
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={absen?.length || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]} // Pilihan jumlah baris per halaman
      />

      {/* Modal untuk menampilkan detail kehadiran */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Detail Kehadiran</DialogTitle>
        <DialogContent>
          {detailedAbsensi.map((item, index) => (
            <div key={index}>
              <Typography variant="body1">{`Pertemuan Ke: ${item.pertemuan_ke}`}</Typography>
              <Typography variant="body1">{`Status: ${item.status}`}</Typography>
              <Typography variant="body1">{`Waktu: ${item.pertemuan.waktu}`}</Typography>
              <Typography variant="body1">{`Tanggal: ${item.pertemuan.tanggal_kuliah}`}</Typography>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Tutup</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default TableKehadiran;
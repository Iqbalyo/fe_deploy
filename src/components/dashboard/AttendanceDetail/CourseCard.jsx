import React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

const CourseCard = ({ course }) => {
  const { name, present, absent, excused } = course;

  // Handler for the Informasi button
  const handleInfoClick = () => {
    alert(`Pertemuan ke-10: Tatap Muka`);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography level="title-md">{name}</Typography>
        <Typography>Hadir: {present}</Typography>
        <Typography>Tidak Hadir: {absent}</Typography>
        <Typography>Izin: {excused}</Typography>
        <Button 
          variant="soft" 
          color="primary" 
          onClick={handleInfoClick}
          sx={{ marginTop: 2 }}
        >
          pertemuan ke 11
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;

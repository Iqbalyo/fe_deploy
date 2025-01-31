import React from 'react';
import CourseCard from './CourseCard';
import courseData from './courseData';
import Box from '@mui/joy/Box';

const AttendanceListCard = () => {
  return (
    <Box 
      sx={{
        width: '100%',
        display: 'grid',
        gap: 2, 
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)', //  (mobile)
          sm: 'repeat(2, 1fr)', //  (tablet)
          md: 'repeat(3, 1fr)', // (desktop)
        },
      }}
    >
      {courseData.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </Box>
  );
};

export default AttendanceListCard;

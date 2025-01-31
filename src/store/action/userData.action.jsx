import { actionTypes } from "../actionTypes";

const baseUrl = "https://be-deploy-sage.vercel.app";

export function login(params) {
  return async dispatch => {
    dispatch({ type: actionTypes.SEARCH_REQUEST });
    try {
      const response = await fetch(baseUrl + "/monitoring/unama/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      const token = data.accessToken
      const nim = data.nim
      const nama = data.nama
      console.log("Data tokennya : ", token)
      // Simpan token ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("nim", nim);
      localStorage.setItem("nama", nama);
      // Dispatch hasil ke Redux
      dispatch({ type: actionTypes.SEARCH_SUCCESS, payload: data.data });

      // Kembalikan data agar komponen tahu login berhasil
      return data;
    } catch (error) {
      // Dispatch error ke Redux
      dispatch({ type: actionTypes.SEARCH_FAILED, payload: error.message });
      throw error; // Lempar error ke komponen
    }
  };

}


//absen
// export function getAbsensiById(nim) {
//   return async dispatch => {
//       dispatch({ type: actionTypes.GET_INFORMASIABSENSI_REQUEST});
//       try {
//           const response = await fetch(`${baseUrl}/monitoring/unama/v1/absensi/${nim}`, {
//               method: 'GET',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//           });
//           if (response.status === 403) {
//               window.location.href = '/login';
//               return;
//           }
//           const res = await response.json();
//           console.log("data : ", res)
//           console.log("Response Data:", res.data);
//           dispatch({ type: actionTypes.GET_INFORMASIABSENSI_SUCCESS, payload: res.data });
//       } catch (error) {
//           dispatch({ type: actionTypes.GET_INFORMASIABSENSI_FAILED, payload: error.message });
//       }
//     };
// }


//berikut ini fe ny tabelKehadiran
export function getAbsensiById(nim) {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_INFORMASIABSENSI_REQUEST });
    try {
      const response = await fetch(`${baseUrl}/monitoring/unama/v1/absensi/${nim}`);
      if (!response.ok) {
        throw new Error('Failed to fetch absensi');
      }

      const res = await response.json();
      console.log("Response API:", res); 
      // Cari pertemuan terakhir
      const pertemuan_terakhir = res.data.reduce((max, item) => 
        Math.max(max, item.pertemuan_ke || 0), 0
      );
      dispatch({ 
        type: actionTypes.GET_INFORMASIABSENSI_SUCCESS, 
        payload: res.data,
        semester: res.semester,
        periode: res.periode,
        semesterTerakhir: res.semesterTerakhir,
        pertemuan_terakhir, // Sertakan pertemuan terakhir
      });
    } catch (error) {
      console.error('Error fetching absensi:', error);
      dispatch({ type: actionTypes.GET_INFORMASIABSENSI_FAILED, payload: error.message });
    }
  };
}

//ipk
export function getIpkByNim() {
  return async dispatch => {
      dispatch({ type: actionTypes.GET_IPK_REQUEST});
      try {
        const nim = localStorage.getItem('nim')
          const response = await fetch(`${baseUrl}/monitoring/unama/v1/ipk/dataipk`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(nim),
          });
          
          const res = await response.json();
          console.log("data data : ", params)
          console.log("Response Data:", res.data);
          dispatch({ type: actionTypes.GET_IPK_SUCCESS, payload: res.data });
      } catch (error) {
          dispatch({ type: actionTypes.GET_IPK_FAILED, payload: error.message });
      }
    };
}


// jurusan
export function getJurusan() {
  return async dispatch => {
    dispatch({ type: actionTypes.GET_JURUSAN_REQUEST });
    try {
      const response = await fetch(`${baseUrl}/monitoring/unama/v1/jurusan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const res = await response.json();
      console.log("Data jurusan:", res.data);
      dispatch({ type: actionTypes.GET_JURUSAN_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: actionTypes.GET_JURUSAN_FAILED, payload: error.message });
    }
  };
}


//jadwal
export const getJadwalByNim = (nim) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_JADWAL_REQUEST });
  try {
    const response = await fetch(`${baseUrl}/monitoring/unama/v1/jadwalKuliah/${nim}`);
    if (!response.ok) {
      throw new Error('Failed to fetch jadwal');
    }

    const data = await response.json();
    console.log("Jadwal Response:", data);
    dispatch({ type: actionTypes.GET_JADWAL_SUCCESS, payload: data });
  } catch (error) {
    console.error('Error fetching jadwal:', error);
    dispatch({ type: actionTypes.GET_JADWAL_FAILED, payload: error.message });
  }
};







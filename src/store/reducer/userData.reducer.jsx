import { actionTypes } from "../actionTypes/index";

const initState = {
  isLoading: false,
  login: null,
  absen: [],
  currentSemester: null,
  lastSemester: null,
  currentPeriode: null,
  ipk: [],
  jurusan: [],
   jadwal: [],
   pertemuan_terakhir: null, // Tambahkan ini
};

const data = (state = initState, action) => {
  console.log("action ? ", action);
  console.log("action ? ", state);
  switch (action.type) {
    case actionTypes.SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        login: action.payload,
      };
    case actionTypes.SEARCH_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };

    //absen
    case actionTypes.GET_INFORMASIABSENSI_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_INFORMASIABSENSI_SUCCESS:
      console.log('Payload:', action.payload);
      console.log('Semester:', action.semester);
      console.log('Periode:', action.periode);
      return {
        ...state,
        isLoading: false,
        absen: action.payload,
        currentSemester: action.semester,
        currentPeriode: action.periode,
        lastSemester: action.semesterTerakhir,
        pertemuan_terakhir: action.pertemuan_terakhir, // Tambahkan ini
        
        
      };
    case actionTypes.GET_INFORMASIABSENSI_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };
    //IPK DARI TABEL AKTIVITASKULIAHS
    case actionTypes.GET_IPK_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_IPK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ipk: action.payload,
      };
    case actionTypes.GET_IPK_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };

    //

    case actionTypes.GET_IPS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_IPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ipsData: action.payload, // Tambahkan data IPS ke state
      };
    case actionTypes.GET_IPS_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };

    //jurusan
    case actionTypes.GET_JURUSAN_REQUEST:
      return { ...state, loading: true };
    case actionTypes.GET_JURUSAN_SUCCESS:
      return { ...state, loading: false, jurusan: action.payload };
    case actionTypes.GET_JURUSAN_FAILED:
      return { ...state, loading: false, error: action.payload };

    //end jurusan
    case actionTypes.GET_JADWAL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_JADWAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jadwal: action.payload, // Menyimpan jadwal ke state
      };
    case actionTypes.GET_JADWAL_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };
    
  


    default:
      return state;
  }
};

export default data;

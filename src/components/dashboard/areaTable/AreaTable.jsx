import "./AreaTable.scss";

const TABLE_HEADS = [
  "Mata Kuliah",
  "Pertemuan Ke",
  "Lokasi",
  "Tanggal",
  "Jam",
];

const SCHEDULE_DATA = [
  {
    subject: "Jaringan Komputer",
    meeting: 3,
    location: "Kampus Thehock, Labor 1.4",
    date: new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    time: "08:00",
  },
];

const AreaTable = () => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Jadwal Perkuliahan Hari Ini</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCHEDULE_DATA?.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.subject}</td>
                <td>{schedule.meeting}</td>
                <td>{schedule.location}</td>
                <td>{schedule.date}</td>
                <td>{schedule.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;

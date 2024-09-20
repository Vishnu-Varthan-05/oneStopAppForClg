export default function TimetableCard({ timetable }) {
  return (
    <div
      className="bg-purewhite border border-purple rounded-md p-5 hover:bg-gray-100 transition duration-300 ease-in-out"
    >
      <h2 className="text-lg font-bold text-purple">Time: {timetable.from} - {timetable.to}</h2>
      <p className="text-md text-black">{timetable.description} </p>

    </div>
  );
}

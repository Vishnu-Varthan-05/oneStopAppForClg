import NotifyButton from "./NotifyButton";

export default function TimetableCard({ timetable }) {
  return (
    <div className="relative bg-purewhite border border-purple rounded-md p-5 hover:bg-gray-100 transition duration-300 ease-in-out">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-bold text-purple">
          Time: {timetable.from} - {timetable.to}
        </h2>
        <NotifyButton /> 
      </div>
      <p className="text-md text-black">{timetable.description}</p>
    </div>
  );
}

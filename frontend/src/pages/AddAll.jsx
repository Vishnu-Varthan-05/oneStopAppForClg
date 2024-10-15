import EventCompetitionForm from "../components/EventCompetitionForm";

const AddAll = () => {
  return (
    <div className="flex flex-col items-center m-5">
      <h1 className="text-3xl font-bold text-center text-purple m-5">Add Form 🗎</h1>
      <div className="p-5 border border-purple-600 rounded-md w-full max-w-4xl">
        <EventCompetitionForm />
      </div>
    </div>
  );
};

export default AddAll;
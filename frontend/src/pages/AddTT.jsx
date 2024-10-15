import TimeTableForm from "../components/TimeTableForm";

function AddTT(params) {
    return(
        <div className="flex flex-col items-center m-5">
            <h1 className="text-3xl font-bold text-center text-purple m-5">Add TimeTable Form 🗎</h1>
            <div className="p-5 border border-purple-600 rounded-md w-full max-w-4xl">
                <TimeTableForm/>
            </div>
        </div>
    )
}
export default AddTT;
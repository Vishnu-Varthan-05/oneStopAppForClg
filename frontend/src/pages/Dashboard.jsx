import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActiveCard from "../components/ActiveCard";
import EditableTable from "../components/EditableTable";
import Button from "../components/Button";
import Logout from "../components/Logout";

export default function Dashboard() {
  const [tableType, setTableType] = useState("competitions");
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    setTableType(type.toLowerCase() + "s");
  };

  const handleAddCompEveClick = () => {
    navigate("/addAll");
  };
  const handleAddTTClick = () =>{
    navigate("/addTT");
  };

  return (
    <div className="m-2 p-2">
      <h1 className="text-3xl font-bold text-center text-purple mb-3 flex justify-between m-5 mb-5">
        Dashboard 🚀
        <Logout/>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 rounded-md">
        <ActiveCard type={"Event"} onClick={() => handleCardClick("Event")} />
        <ActiveCard
          type={"Competition"}
          onClick={() => handleCardClick("Competition")}
        />
        <ActiveCard
          type={"Webinar"}
          onClick={() => handleCardClick("Webinar")}
        />
      </div>
      <div className="my-4 flex justify-end space-x-5">
        <Button onClick={handleAddTTClick}>Add new TimeTable</Button>
        <Button onClick={handleAddCompEveClick}>Add New Competitions and Events/Webinars</Button>
      </div>
      <EditableTable type={tableType} />
    </div>
  );
}

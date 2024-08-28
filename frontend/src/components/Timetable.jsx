import Logout from "./Logout"
import SelectInput from "./SelectInput"
import TextInput from "./TextInput"
export default function Timetable(){
    return(
        <>
        <TextInput label={"Hello"}/>
        <SelectInput label={"Select the Brand"}options={[{"id":1,"name":"vivo"}, {"id":2, "name":"samsung"}]}/>
        </>
    )
}
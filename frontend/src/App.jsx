import Button from "./components/Button"
import Profile from "./components/Profile"


function App() {
  const data = [
    {
        name: "dhich",
        age: 18,
        des: "student"
    },
    {
        name: "vishnu",
        age: 18,
        des: "student"
    }
]

  return (
    <>
      {data.map((data) => {
      
      return <Profile name = {data.name} age = {data.age} des = {data.des}/>  

      }

      )}
      <Button name = {"Sign in"}/>
    </>  

  )
}

export default App

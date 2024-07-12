function Profile(props){
    return (
        <div style={{borderRadius: "5px solid black"}}>
            <h1>Name : {props.name}</h1>
            <p>Age : {props.age}</p>
            <p>About : {props.des}</p>
        </div>
    )
}

export default Profile;
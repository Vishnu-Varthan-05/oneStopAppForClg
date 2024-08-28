import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api";

export default function Users() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['data'], 
        queryFn: () => fetchData('users/1')
    });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return(
        <>
            <p>{data.username} your email id is {data.email} am i correct </p>
        </>
    )
    
}

import { useQuery } from "@tanstack/react-query";
import { fetchData } from '../api'; 

export default function ActiveCard({ type, onClick }) {
    const { data, error, isLoading } = useQuery({
        queryKey: [type], 
        queryFn: () => fetchData(`faculty/${type}Count`), 
    });

    if (isLoading) return <div className="loading-text">Loading...</div>;

    if (error) return <div className="error-text">Error: {error.message}</div>;
    console.log(data)
    const count = data?.data|| 0;
    console.log(count)
    return (
        <div 
            className="bg-purewhite border border-purple rounded-md p-5 hover:bg-gray-100 transition duration-300 ease-in-out flex flex-col items-center cursor-pointer"
            onClick={onClick}
        >
            <h2 className="text-lg font-bold text-purple text-center">Active {type}</h2>
            <p className="text-2xl font-bold text-center">{count}</p> 
        </div>
    );
}

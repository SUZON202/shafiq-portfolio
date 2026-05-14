import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            // এখানে Vercel লিংকের বদলে localhost:5000 দেওয়া হয়েছে
            const res = await fetch(`https://shafiq-portfolio-server.vercel.app/users/admin/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            const data = await res.json();
            return data?.admin;
        }
    });
    return [isAdmin, isAdminLoading];
};

export default useAdmin;
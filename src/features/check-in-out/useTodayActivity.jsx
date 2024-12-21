import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
    const { data: activities, isPending: isLoadingActivities } = useQuery({
        queryKey: ["activities"],
        queryFn: getStaysTodayActivity,
    });

    return { activities, isLoadingActivities };
}

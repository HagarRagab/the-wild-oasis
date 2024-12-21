import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";

import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
    const numBookings = bookings.length;

    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    const checkIns = confirmedStays.length;

    // total Confirmed days / total available days > (number fo days [30 or 90] * total number of available cabins)
    const occupation = Math.round(
        (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
            (numDays * cabinsCount)) *
            100
    );

    return (
        <>
            <Stat
                icon={<HiOutlineBriefcase />}
                title="Bookings"
                value={numBookings}
                color="blue"
            />
            <Stat
                icon={<HiOutlineBanknotes />}
                title="Sales"
                value={formatCurrency(sales)}
                color="green"
            />
            <Stat
                icon={<HiOutlineCalendarDays />}
                title="Check ins"
                value={checkIns}
                color="indigo"
            />
            <Stat
                icon={<HiOutlineChartBar />}
                title="Occupancy rate"
                value={occupation}
                color="yellow"
            />
        </>
    );
}

export default Stats;

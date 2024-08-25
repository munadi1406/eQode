'use client';

import { useEffect, useState } from "react";

const LocalTime = ({ time }) => {
    const [localTime, setLocalTime] = useState("");

    useEffect(() => {
        if (time) {
            // Mengubah waktu UTC ke waktu lokal perangkat
            const localTimeString = new Date(time).toLocaleString();
            setLocalTime(localTimeString);
        }
    }, [time]);

    return (
        <>
            {localTime}
        </>
    );
}

export default LocalTime;

import React, { useState, useEffect } from 'react'

const TimeNow = () => {
    const [currentDateTime, setCurrentDateTime] = useState('');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            };
            setCurrentDateTime(now.toLocaleString('en-US', options));
        };

        // Initialize and set interval
        // updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className="timeNow text-dark fw-bolder">{currentDateTime}</div>
        </>
    )
}

export default TimeNow

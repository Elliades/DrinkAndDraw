import React, { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(10);
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (seconds <= 3 && seconds > 0) {
            setBlink(true);
        } else {
            setBlink(false);
        }
    }, [seconds]);

    return (
        <div className={blink ? 'blink' : ''}>
            {seconds} seconds
        </div>
    );
}
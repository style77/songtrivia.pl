'use client'
import { Clock, Song } from '@/types';
import { useEffect, useState } from 'react';

const useClock = (timeout: number, timeoutCallback: () => void) => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(timeout);

    useEffect(() => {
        if (isRunning) {

            if (time === 0) {
                timeoutCallback();
                reset();
                return;
            }

            const timer = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isRunning, time]);

    const start = () => {
        setIsRunning(true);
    }

    const stop = () => {
        setIsRunning(false);
    }

    const reset = () => {
        stop();
        setTime(timeout);
    }

    return { isRunning, time, start, stop, reset };
}

export default useClock;
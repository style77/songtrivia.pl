import React, { useState, useEffect } from 'react';
import { useCountdown } from 'usehooks-ts';

type PreGameCountdownProps = {
    startGame: () => void;
}

function PreGameCountdown({ startGame }: PreGameCountdownProps) {
    const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
        countStart: 3,
        intervalMs: 1000,
    });

    useEffect(() => {
        startCountdown();
        return () => {
            stopCountdown(); // Stop the countdown when the component unmounts
        };
    }, [startCountdown, stopCountdown]);    

    useEffect(() => {
        if (count === 0) {
          startGame(); // Call the startGame function when countdown reaches 0
        }
      }, [count, startGame]);

    return (
        <div className="">
            {count > 0 ? <h1>{count}</h1> : <h1>Go!</h1>}
        </div>
    );
}

export default PreGameCountdown;
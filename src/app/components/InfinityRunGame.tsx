'use client';

import { useEffect, useState } from "react";
import { Clock, Question, Song } from "@/types";
import { useCountdown } from "usehooks-ts"; // Import the useCountdown hook
import useSong from "@/hooks/useSong";
import VolumeControl from "./VolumeControl";
import PreGameCountdown from "./PreGameCountdown";

type InfinityRunGameProps = {
    questions: Question[];
    failCallback: () => void;
    successCallback: () => void;
    gameType: string;
}

const InfinityRunGame = (props: InfinityRunGameProps) => {
    const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
        countStart: 10,
        intervalMs: 1000,
    });
    const song = useSong(props.questions[0].previewUrl);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (playing) {
            next();
        }
    }, [playing]);

    useEffect(() => {
        if (count <= 0 && playing && index > 0) {
            props.failCallback();
            song.stop();
            stopCountdown();
        }
    }, [count]);

    const next = () => {
        stopCountdown();

        const nextIndex = index + 1
        setIndex(nextIndex);
        song.setUrl(props.questions[nextIndex].previewUrl);

        resetCountdown();
        startCountdown();
        song.play();
    }

    const answerQuestion = (answer: string) => {
        if (answer === props.questions[index].correctAnswer) {
            props.successCallback();
        } else {
            props.failCallback();
            if (props.gameType === "run") {
                stopCountdown();
                song.stop();
                return;
            }
        }
        next();
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <VolumeControl audio={song.audio} />
            {playing ? (
                <>
                    <p>{count}</p>
                    <p>{props.questions[index].question}</p>
                    <div className="flex flex-row gap-4 items-center justify-center">
                        {props.questions[index].answers.map((answer, i) => (
                            <button key={i} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} onClick={() => {
                                answerQuestion(answer);
                            }}>
                                {answer}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <PreGameCountdown startGame={() => {
                    setPlaying(true);
                }} />
            )}
        </div>
    )
}

export default InfinityRunGame;
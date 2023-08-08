'use client';

import { useEffect, useState } from "react";
import useClock from "@/hooks/useClock";
import { Clock, Question, Song } from "@/types";
import useSong from "@/hooks/useSong";

type QuestionCardProps = {
    questions: Question[];
    failCallback: (clock: Clock | undefined, song: Song | undefined) => void;
    successCallback: () => void;
    gameType: string;
}

const QuestionCard = (props: QuestionCardProps) => {
    const clock = useClock(10, props.failCallback);
    const song = useSong(props.questions[0].previewUrl);
    const [index, setIndex] = useState(-1);
    const [playing, setPlaying] = useState(false);

    const counter = useClock(3, () => setPlaying(true))

    useEffect(() => {
        counter.start();
        if (counter.time === 0 && !playing) {
            setPlaying(true);
            counter.stop();
            next();
        }
    }, [counter.time]);

    useEffect(() => {
        if (index === -1) return;

        // If there is no preview url, skip to the next question
        if (!props.questions[index].previewUrl) {
            next();
            return;
        }

        if (index >= props.questions.length) {
            setIndex(0);
        }
    }, [index]);

    useEffect(() => {
        if (song.audio.currentTime >= 10) {
            next();
        }
    }, [song.audio.currentTime]);

    const next = () => {
        clock.stop();
        setIndex(index + 1);
        song.setUrl(props.questions[index + 1].previewUrl);
        clock.reset()
        clock.start();
        song.play();
    }

    const answerQuestion = (answer: string) => {
        if (answer === props.questions[index].correctAnswer) {
            props.successCallback();
        } else {
            props.failCallback(clock, song);
            if (props.gameType === "run") {
                return;
            }
        }
        next();
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {playing ? (
                <>
                    <p>{clock.time}</p>
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
                <p>Starting in {counter.time}</p>
            )}
        </div>
    )
}

export default QuestionCard;
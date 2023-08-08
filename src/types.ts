export interface Question {
    type: string;
    question: string;
    answers: string[];
    correctAnswer: string;
    previewUrl: string;
}

export interface Song {
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    setUrl: (url: string) => void;
    stop: () => void;
    audio: HTMLAudioElement;
}

export interface Clock {
    isRunning: boolean;
    time: number;
    start: () => void;
    stop: () => void;
    reset: () => void;
}
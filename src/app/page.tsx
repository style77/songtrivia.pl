"use client"

import spotify from '@/spotify/sdk'
import { Clock, Question, Song } from '@/types'
import Image from 'next/image'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import InfinityRunGame from './components/InfinityRunGame'
import ScoreDisplay from './components/ScoreDisplay'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, trigger, reset } = useSWRMutation<Question[]>('/api/questions', fetcher)
  const [points, setPoints] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleRetry = () => {
    setShowScore(false);
    setPoints(0);
    trigger();
  };

  const handleFail = () => {
    reset();
    setShowScore(true);
  };

  const handleSuccess = () => {
    setPoints(points + 1);
  };

  const showScoreDisplay = !data && showScore;
  const showQuestionCard = data;
  const showStartButton = !data && !showScore;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center justify-center">
        {showScoreDisplay && <ScoreDisplay points={points} onRetry={handleRetry} />}
        {showQuestionCard && (
          <InfinityRunGame questions={data} failCallback={handleFail} successCallback={handleSuccess} gameType="run" />
        )}
        {showStartButton && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => trigger()}>
            Start
          </button>
        )}
      </div>
    </main>
  );
}

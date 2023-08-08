"use client"

import spotify from '@/spotify/sdk'
import { Clock, Question, Song } from '@/types'
import Image from 'next/image'
import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import QuestionCard from './components/QuestionCard'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const { data, trigger, reset } = useSWRMutation<Question[]>('/api/questions', fetcher)
  const [points, setPoints] = useState(0)
  const [showScore, setShowScore] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center justify-center">

        {!data && showScore ? (
          <div>
            <p className="text-4xl">Zdobyłeś {points} punktów!</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => { setShowScore(false); setPoints(0); trigger() }}>
              Spróbuj ponownie
            </button>
          </div>
        ) : data ? (
          <QuestionCard questions={data} failCallback={(clock: Clock | undefined, song: Song | undefined) => {
            clock && clock.stop();
            song && song.stop();
            reset();
            setShowScore(true);
          }} successCallback={() => { setPoints(points + 1) }} gameType="run" />
        ) : (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => trigger()}>
            Start
          </button>
        )}
      </div>
    </main>
  )
}

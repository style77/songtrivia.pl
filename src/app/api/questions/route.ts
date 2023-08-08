import { PLAYLISTS, QUESTIONTYPES } from "@/constants"
import spotify from "@/spotify/sdk"
import { Question } from "@/types"
import Track from "@spotify/web-api-ts-sdk"
import { NextResponse } from "next/server"

/**
 * Shuffles the elements of an array using the Fisher-Yates shuffle algorithm.
 *
 * @param {any[]} array - The array to be shuffled.
 * @return {any[]} - The shuffled array.
 */
function shuffleArray(array: any[]): any[] {
    const shuffledArray = array.slice(); // Copy the array to avoid modifying the original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function generateQuestionsForTrack(track: Track.Track, allTracks: Track.PlaylistedTrack[]) {
    const questions = [];

    const questionType = QUESTIONTYPES[Math.floor(Math.random() * QUESTIONTYPES.length)];
    
    const correctAnswer = questionType == "song" ? track.name : track.artists[0].name;

    // Generate distinct incorrect answers
    const incorrectAnswers = generateDistinctIncorrectAnswers(correctAnswer, questionType, allTracks);

    const answers = shuffleArray([correctAnswer, ...incorrectAnswers]);

    questions.push({
        type: questionType,
        question: questionType == "song" ? `Co to za piosenka?`: `Kto jest wykonawcą tej piosenki?`,
        answers: answers,
        correctAnswer: correctAnswer,
        previewUrl: track.preview_url
    });

    return questions;
}

function generateDistinctIncorrectAnswers(correctAnswer: string, questionType: string, allTracks: Track.PlaylistedTrack[]) {
    const incorrectAnswers = new Set<string>();

    while (incorrectAnswers.size < 3) {
        const randomTrack = allTracks[Math.floor(Math.random() * allTracks.length)].track as Track.Track;
        const incorrectAnswer = questionType === "song" ? randomTrack.name : randomTrack.artists[0].name;

        // Make sure incorrect answer is distinct from correct answer
        if (incorrectAnswer !== correctAnswer) {
            incorrectAnswers.add(incorrectAnswer);
        }
    }

    return [...incorrectAnswers];
}

export async function GET() {
    const playlist = PLAYLISTS[Math.floor(Math.random() * PLAYLISTS.length)];
    const tracks = shuffleArray((await spotify.playlists.getPlaylistItems(playlist, "PL", "items(track(name,artists(name),preview_url))", 50, 0, "track")).items);

    const questions = [];

    for (const trackItem of tracks) {
        const track = trackItem.track as Track.Track;

        questions.push(...generateQuestionsForTrack(track, tracks));
    }

    const res = NextResponse.json(
        questions
    )
    res.headers.set('Cache-Control', 'no-store')
    
    return res
}
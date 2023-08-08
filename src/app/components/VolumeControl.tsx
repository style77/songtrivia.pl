import React, { useRef } from 'react';

type VolumeControlProps = {
    audio: HTMLAudioElement | null;
};

const VolumeControl = ({ audio }: VolumeControlProps) => {
    const volumeRef = useRef<HTMLInputElement | null>(null);

    const handleVolumeChange = () => {
        if (audio && volumeRef.current) {
            const newVolume = parseInt(volumeRef.current.value, 10); // Parse the string value to an integer
            audio.volume = newVolume / 100;
        }
    };

    return (
        <div>
            <label htmlFor="volumeSlider">Volume:</label>
            <input
                ref={volumeRef}
                type="range"
                id="volumeSlider"
                min="0"
                max="100"
                defaultValue={100}
                onChange={handleVolumeChange}
            />
        </div>
    );
};

export default VolumeControl;
"use client"
import Image from "next/image";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import MicIcon from "../../assets/google-voice.png";
import { useSearch } from "@/store/search";
import {shallow} from "zustand/shallow"
import { useEffect } from "react";
import { BeatLoader } from "react-spinners";

function VoiceBtn() {
    const { transcript, listening } = useSpeechRecognition();
    const { search, setSearch } = useSearch(
      (state) => ({ search: state.search, setSearch: state.setSearch }),
      shallow
    );


    function handleClick() {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening()
        }
    }

    useEffect(() => {
        setSearch(transcript)
    },[transcript])

  return (
      <div className="flex flex-col items-center gap-3">
          <button onClick={handleClick} className="btn !btn-circle btn-ghost btn-lg gr">
              {
                  listening ? <BeatLoader color="#4285F4" size={13}/> : <Image src={MicIcon} width={35} height={25} alt="icon"/>
              }
          </button>
          <p className="uppercase dark:text-gray-300">try with voice</p>
    </div>
  )
}

export default VoiceBtn
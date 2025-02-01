'use client'
import { Button } from '@/components/ui/button'
import { Mic, WebcamIcon } from 'lucide-react'
import React from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { useEffect, useState } from 'react';
import { toast } from 'sonner'



function RecordAnswerSection({mockInterviewQuestions, activeQuestionIndex}) {
    const [answer, setAnswer] = useState('')
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(() => {
      results.map((result) => {
        setAnswer(prevAnswer => prevAnswer + result.transcript)
      })
      }, [results])

      const saveUserAnswer = async () => {
        if(isRecording){
            stopSpeechToText()
            if(answer.length < 10){
                toast.error('Answer is too short')
                return;
            }

            const feedbackPrompt = "Question"
        }
        else{
            startSpeechToText()
        }
      }
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='mt-10 flex flex-col items-center justify-center bg-secondary rounded-lg p-5'>
            <WebcamIcon width={200} height={200} className='absolute' />
            <Webcam
            style={{
                borderRadius: '10px',
                zIndex: 10,
                width: '100%',
                height: '300px',
            }}
            mirrored={true}
            />
        </div>
        <Button variant={'outline'} className='my-10' onClick={saveUserAnswer}>
            {isRecording ? 
            <h2 className='text-red-600 flex flex-row items-center gap-2'>
                <Mic/> Recording...
            </h2>: 'Start Recording'}
        </Button>

<Button onClick={()=>{
    console.log(answer)
}}>Show User Answer</Button>
        <div>
      {/* <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul> */}
    </div>
    </div>
  )
}

export default RecordAnswerSection
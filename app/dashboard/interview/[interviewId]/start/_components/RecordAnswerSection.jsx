'use client'
import { Button } from '@/components/ui/button'
import { Mic, WebcamIcon } from 'lucide-react'
import React from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { useEffect, useState } from 'react';
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel';
import db  from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';




function RecordAnswerSection({mockInterviewQuestions, activeQuestionIndex, interviewDetails}) {
    const [answer, setAnswer] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useUser()
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
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
            setIsLoading(true)
            stopSpeechToText()
            
            if(answer.length < 10){
                setIsLoading(false)
                toast.error('Answer is too short')
                return;
            }

            const feedbackPrompt = "Question: "+mockInterviewQuestions[activeQuestionIndex].question+"\n\n"
            +"User Answer: "+answer+"\n\n"+",Depends on the user answer, give rating on the answer and feedback as area of improvements if any"
            + " in just 3-5 lines to improve it in json format with rating field and feedback field";

            //pass to chatSession from GeminiAIModel
            console.log(feedbackPrompt)
            const result = await chatSession.sendMessage(feedbackPrompt)
        const mockJsonResponse = (result.response.text()).replace(/```json/g, '').replace(/```/g, '');
        const jsonFeedbackResp = JSON.parse(mockJsonResponse);

        const response = await db.insert(UserAnswer).values({
            question: mockInterviewQuestions[activeQuestionIndex].question,
            userAns: answer,
            correctAns: mockInterviewQuestions[activeQuestionIndex].answer,
            rating: jsonFeedbackResp.rating,
            feedback: jsonFeedbackResp.feedback,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            mockId: interviewDetails.mockId
        });

        if(response){
            toast.success('Answer saved successfully')
        }
        setResults([])
        setIsLoading(false)
        setAnswer('')
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
        <Button disabled={isLoading} variant={'outline'} className='my-10' onClick={saveUserAnswer}>
            {isRecording ? 
            <h2 className='text-red-600 flex flex-row items-center gap-2'>
                <Mic/> Recording...
            </h2>: 'Start Recording'}
        </Button>

{/* <Button onClick={()=>{
    console.log(answer)
}}>Show User Answer</Button> */}
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
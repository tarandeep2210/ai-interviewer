import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react'
import { useState } from 'react';


function QuestionsSection({ mockInterviewQuestions, activeQuestionIndex }) {

    const textToSpeech = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
  return mockInterviewQuestions && (
    <div className='p-5 border bounded-lg my-10'>
        
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {mockInterviewQuestions&&mockInterviewQuestions.map((question, index) => (
                <h2 
                    key={index}
                    className={`p-2 bg-gray-200 rounded-full
                    text-xs md:text-sm text-center cursor-pointer
                     ${activeQuestionIndex ==index &&  'bg-blue-700 text-white' }`}>Question #{index+1}</h2>
            ))}
             
        </div>
        <h2 className='my-5 text-md md:text-lg font-semibold'>{mockInterviewQuestions[activeQuestionIndex].question}</h2>
        <Volume2 className='cursor-pointer my-10' onClick={()=> textToSpeech(mockInterviewQuestions[activeQuestionIndex].question)}/>

        <div className='p-5 border rounded-lg bg-blue-100'>
            <h2 className='flex gap-2 items-center text-blue-700'>
                <Lightbulb className='w-4 h-4' />
                <strong>Tip:</strong>
            </h2>
            <h2>Click Record to start recording your answer</h2>
        </div>
    </div>
  )
}
export default QuestionsSection
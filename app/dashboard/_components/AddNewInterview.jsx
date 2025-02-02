'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import db from '@/utils/db';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';


function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState('full stack developer');
    const [jobDesc, setJobDesc] = useState('react, angular, nodejs, mysql');
    const [jobExp, setJobExp] = useState('5');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    
    const onSubmit = async () => {
        setLoading(true);
        console.log(jobPosition, jobDesc, jobExp);
        const inputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExp + ", Depends on this information please give me 5 Interview question with Answered in Json Format, Give Question and Answered as field in JSON"
        const result = await chatSession.sendMessage(inputPrompt)
        const mockJsonResponse = (result.response.text()).replace(/```json/g, '').replace(/```/g, '');
        console.log(JSON.parse(mockJsonResponse));
        setJsonResponse(JSON.parse(mockJsonResponse));

        if (mockJsonResponse) {
            console.log("Inserting into DB", moment().format('DD-MM-yyyy'));
            const resp = await db.insert(MockInterview).values(
                {
                    mockId: uuidv4(),
                    jobPosition: jobPosition,
                    jobDescription: jobDesc,
                    jobExperience: jobExp,
                    jsonMockResp: mockJsonResponse,
                    createdBy: user?.primaryEmailAddress?.emailAddress
                }
            ).returning({ mockId: MockInterview.mockId });

            console.log("Inserted ID :", resp);
            if (resp) {
                setOpenDialog(false);
                router.push(`/dashboard/interview/${resp[0].mockId}`);
            }
        }
        else {
            console.log("Something went wrong while generating mock interview");
        }

        setLoading(false);
        // setOpenDialog(false);


    }
    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center'>
                    + Add New
                </h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your Interview</DialogTitle>
                        <DialogDescription>
                            {/* <form> */}
                            <span>

                                <span>Add Details about your job position/role , job description and years of experience</span>
                                <br />
                                <span className='mt-7 my-3 block'>
                                    <label>Job Role/Position</label>
                                    <Input placeholder='Ex. Full Stack Developer' required  onChange={(event) => setJobPosition(event.target.value)} />
                                </span>
                                <span className='my-3 block'>
                                    <label>Job Description/Tech Stack</label>
                                    <Textarea placeholder='Ex. React , Angular , NodeJs, Mysql etd' 
                                     onChange={(event) => setJobDesc(event.target.value)} />
                                       
                                </span>

                                <span className='my-3 block'>
                                    <label>Years of Exp</label>
                                    <Input placeholder='5' type='number' onChange={(event) => setJobExp(event.target.value)} />
                                </span>
                            </span>
                            <span className='flex gap-5 justify-end'>
                                <Button variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button type='submit' disabled={loading} onClick={() => onSubmit()}>
                                    {loading ?
                                        <><LoaderCircle className='animate-spin' />Generating from AI</> : "Start Interview"}
                                </Button>
                            </span>
                            {/* </form> */}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
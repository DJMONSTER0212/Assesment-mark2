import React, { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { createTask, getUsername } from '../helper/helper'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/store'
import useFetch from '../hooks/fetch.hook'
import { useNavigate } from 'react-router-dom'

const plans = [
    {
        name: 'Low',
    },
    {
        name: 'Medium',
    },
    {
        name: 'High',
    },
]



const CreateTask =  () => {
    // const {username} = useAuthStore(state=>state.auth);
    const navigate = useNavigate();

    // const  [username,setUsername]  = useState("");
    // const {username}= getUsername();
    // console.log(username)
    const [{ isLoading, apiData, serverError }] = useFetch();
    // console.log(apiData.username)

    //  console.log();
    // console.log(username)
    const [selected, setSelected] = useState(plans[0])
    const [loading,setLoading] = useState(false);
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    // console.log(selected)
    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setLoading(true);
            const {status} = await createTask({username: apiData.username,  title, description: desc,priority:selected.name })
            if(status===200||status===201){
                toast.success("Created SuccessFully");
                return navigate('/dashboard'); 
            }
            else {
                toast.error("Unable to create Task");
            }
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-10 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create new Task
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        disabled={loading}
                                        id="email"
                                        name="title"
                                        type="text"
                                        // autoComplete="email"
                                        required
                                        onChange={(e)=>setTitle(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                   
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={(e)=>setDesc(e.target.value)}
                                        disabled={loading}
                                        id="description"
                                        name="description"
                                        type="text"
                                        // autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="w-full px-4 py-5">
                                    <div className="mx-auto w-full max-w-md">
                                        <RadioGroup value={selected} onChange={setSelected}>
                                            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                            <div className="space-y-2">
                                                <strong>Priority</strong>
                                                {plans.map((plan) => (
                                                    <RadioGroup.Option
                                                        key={plan.name}
                                                        value={plan}
                                                        disabled={loading}
                                                        className={({ active, checked }) =>
                                                            `${active
                                                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                                                : ''
                                                            }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                                            }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                                        }
                                                    >
                                                        {({ active, checked }) => (
                                                            <>
                                                                <div className="flex w-full  items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        <div className="text-lg">
                                                                            <RadioGroup.Label
                                                                                as="p"
                                                                                className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                                    }`}
                                                                            >
                                                                                {plan.name}
                                                                            </RadioGroup.Label>
                                                                            <RadioGroup.Description
                                                                                as="span"
                                                                                className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                                                                    }`}
                                                                            >
                                                                                <span>
                                                                                    {plan.ram}{plan.cpus}
                                                                                </span>{' '}
                                                                                <span aria-hidden="true"></span>{' '}
                                                                                <span>{plan.disk}</span>
                                                                            </RadioGroup.Description>
                                                                        </div>
                                                                    </div>
                                                                    {checked && (
                                                                        <div className="shrink-0 text-white">
                                                                            <CheckIcon className="h-6 w-6" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    onClick={(e)=>handleCreate(e)}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </>
        </div>
    )
}

export default CreateTask

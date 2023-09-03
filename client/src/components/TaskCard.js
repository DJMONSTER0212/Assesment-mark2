import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteTask, updateTask } from '../helper/helper';
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
const TaskCard = ({ Task, sortedTasks, setSortedTask, count, setCount }) => {
    const [loading,setLoading] = useState(false);
    const [description,setDesc] = useState(Task.description);
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
    // console.log(Task.priority)
    const [selected, setSelected] = useState(plans[Task.priority])
    const [title,setTitle] = useState(Task.title)
    const [temp,setTemp] = useState("");
    const navigate = useNavigate();
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }
    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure to delete this Task")) {
                const  status  = await deleteTask(id);
                // console.log(status)
                if (status === 200 || status === 201) {
                    let array = sortedTasks;
                    array = array.filter((task) => task._id != id)
                    // console.log(array.length())
                    setCount(array.length);
                    setSortedTask(array);
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async(id)=>{
        // console.log(selected)
        let pr = 0;
        // console.log(id)
        if(selected.name==="Low") pr = 0;
        else if(selected.name==='Medium') pr=1;
        else if(selected.name=="High") pr=2;
        // console.log(pr+ "Hello")
        try {
            const body = {
                title : title , description : description , priority :pr
            }
            
            const {status} = await updateTask(id,body)
            // console.log(status)
            if(status===200||status===201){
                setCount(count -1);
                closeModal();
            }
        }catch(error) {
            // console.log(error);
        }
    }
    return (
        <div className='my-2'>
            <div className="max-w-sm w-full lg:flex">

                <div className="border-r w-[500px] border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-3">
                        <div className="text-gray-900 font-bold text-xl mb-2">{Task.title}</div>
                        <p className="text-gray-700 text-base">{Task.description}</p>
                    </div>
                    <div className=' flex flex-row-reverse items-end'>
                        {Task.priority === 2 ? (<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            High
                        </span>) : <></>}
                        {Task.priority === 1 ? (<span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                            Mid
                        </span>) : <></>}
                        {Task.priority === 0 ? (<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Low
                        </span>) : <></>}

                    </div>
                    <div className="flex items-center">
                        <div className="text-lg flex flex-row justify-evenly justify-items-center">
                            <i onClick={openModal} className="fa-solid fa-pen-to-square cursor-pointer"></i>
                            <i onClick={() => handleDelete(Task._id)} className="fa-solid mx-2 cursor-pointer fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
            

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Edit Task ✍ 
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Title
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled={loading}
                                                id="email"
                                                name="title"
                                                type="text"
                                                value={title}
                                                // autoComplete="email"
                                                required
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    {/* </div> */}
                                    {/* </div> */}
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                                Description
                                            </label>

                                        </div>
                                        <div className="mt-2">
                                            <input
                                                onChange={(e) => setDesc(e.target.value)}
                                                disabled={loading}
                                                id="description"
                                                value={description}
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
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={()=>handleUpdate(Task._id)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default TaskCard

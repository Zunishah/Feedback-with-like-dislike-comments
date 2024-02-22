import React, { useState } from 'react';
import FeedbackListing from '../FeedbackListing/FeedbackListing';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Feedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        attachment: null
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            attachment: e.target.files[0]
        });
    };

    const handleDeleteFeedback = (index) => {
        const updatedFeedbackList = [...feedbackList];
        updatedFeedbackList.splice(index, 1);
        setFeedbackList(updatedFeedbackList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        if (!formData.title) {
            errors.title = "Title is required";
        }
        if (!formData.description) {
            errors.description = "Description is required";
        }
        if (!formData.category) {
            errors.category = "Category is required";
        }

        setErrors(errors); 

        if (Object.keys(errors).length === 0) {
            const resp = await axios({
                method: 'POST',
                url: 'https://feedback-5b3e5-default-rtdb.firebaseio.com/something.json',
                data: JSON.stringify({
                    ...formData
                })
            })

            setFeedbackList([...feedbackList, formData]);


            setFormData({
                title: '',
                description: '',
                category: '',
                attachment: null
            });
            toast.success('successfully Submit');
        }
    };

    return (
        <>
            {/* <div className="container mx-auto max-w-md">
        <h1 className="text-3xl font-bold mb-4">Feedback Form</h1> */}

            {/* <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md"/>
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 p-2 block w-full border rounded-md"></textarea>
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md">
              <option value="" disabled>Select Category</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="improvement">Improvement</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs italic">{errors.category}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="attachment" className="block text-gray-700 text-sm font-bold mb-2">Attachment:</label>
            <input type="file" id="attachment" name="attachment" onChange={handleFileChange} className="mt-1 block"/>
          </div>
          <div className='flex justify-between'>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full sm:w-auto">Submit</button>
            <div className="relative md:mr-6 my-2">
                    <Link to={"/"}>
                    <button className="focus:ring-2 h-10 focus:text-white focus:outline-none font-semibold  hover:bg-[#84a5e3] text-black rounded-lg border-[#A6C0F0] border transition duration-150 ease-in-out  rounded   px-5 py-2 text-xs">
                        FeedBack Listing
                    </button>
                    </Link>
                </div>
          </div>
        </form> */}
            {/* </div> */}
            {/* Pass feedbackList as props to FeedbackListing component */}
            {/* <FeedbackListing feedbackList={feedbackList} onDeleteFeedback={handleDeleteFeedback} /> */}








            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">

                    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                        <div
                            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{
                                backgroundImage:
                                    'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
                            }}
                        ></div>
                    </div>
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <img
                                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                                className="w-32 mx-auto"
                            />
                        </div>


                        <form onSubmit={handleSubmit} className="bg-white  rounded px-8 pt-6 pb-8 mb-4">

                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                                {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 p-2 block w-full border rounded-md"></textarea>
                                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                                <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md">
                                    <option value="" disabled>Select Category</option>
                                    <option value="bug">Bug Report</option>
                                    <option value="feature">Feature Request</option>
                                    <option value="improvement">Improvement</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-xs italic">{errors.category}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="attachment" className="block text-gray-700 text-sm font-bold mb-2">Attachment:</label>
                                <input type="file" id="attachment" name="attachment" onChange={handleFileChange} className="mt-1 block" />
                            </div>
                            <div className='flex justify-center md:justify-between mt-8 flex-row flex-wrap'>
                                <button type="submit" className="bg-[#667EEA] focus:ring-2 h-12 focus:text-white  focus:outline-none font-semibold  hover:bg-[#4C51BF] text-white rounded-lg border-[#A6C0F0] border transition duration-150 ease-in-out  rounded   px-14  mt-2 md:mr-2 mb-2 text-md">Submit</button>
                                <div className="relative my-2">
                                    <Link to={"/"}>
                                        <button className="focus:ring-2 h-12 focus:text-white focus:outline-none font-semibold  hover:bg-[#84a5e3] text-black rounded-lg border-[#A6C0F0] border-2 transition duration-150 ease-in-out  rounded   px-5   text-md">
                                            FeedBack Listing
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>

            </div>


        </>
    );
}

export default Feedback;

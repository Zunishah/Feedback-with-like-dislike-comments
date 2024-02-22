import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackListing = () => {
    const [likedIndex, setLikedIndex] = useState(null);
    const [commentedIndex, setCommentedIndex] = useState(null);
    const [feedbackList, setFeedbackList] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [likeCounts, setLikeCounts] = useState([]);
    const [dislikeCounts, setDislikeCounts] = useState([]);
    const [commentsLikes, setCommentsLikes] = useState([]);
    const [commentsDislikes, setCommentsDislikes] = useState([]);
    const [comments, setComments] = useState();

    const [likeLoading, setLikeLoading] = useState(false);
    const [dislikeLoading, setDislikeLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);


    // const handleLikeClick = async (item, parentId) => {
    //     setLikeLoading(true);
    //     await handleLike(item, parentId);
    //     setLikeLoading(false);
    // };

    // const handleDislikeClick = async (item, parentId) => {
    //     setDislikeLoading(true);
    //     await handleDislike(item, parentId);
    //     setDislikeLoading(false);
    // };

    // const handleCommentClick = async (index) => {
    //     setCommentLoading(true);
    //     await handleComment(index);
    //     setCommentLoading(false);
    // };


    const fetchLikes = async () => {
        const { data } = await axios({
            method: 'GET',
            url: 'https://feedback-5b3e5-default-rtdb.firebaseio.com/likes.json'
        });

        const likesArr = []

        data && Object.keys(data)?.map((item) => {
            const foundedRecord = likesArr.find((ss) => ss.id === data[item].postId)
            const foundedRecordIndex = likesArr.findIndex((ss) => ss.id === data[item].postId)

            if (foundedRecord) {
                likesArr[foundedRecordIndex].count += 1
            } else {
                likesArr.push({
                    count: 1,
                    id: data[item].postId,
                    parentId: item
                })
            }
        })
        setLikeCounts(likesArr)

    }

    const fetchDislikes = async () => {
        const { data } = await axios({
            method: 'GET',
            url: 'https://feedback-5b3e5-default-rtdb.firebaseio.com/dislikes.json'
        });

        const dislikesArr = []

        data && Object.keys(data)?.map((item) => {
            const foundedRecord = dislikesArr.find((ss) => ss.id === data[item].postId)
            const foundedRecordIndex = dislikesArr.findIndex((ss) => ss.id === data[item].postId)

            if (foundedRecord) {
                dislikesArr[foundedRecordIndex].count += 1
            } else {
                dislikesArr.push({
                    count: 1,
                    id: data[item].postId,
                    parentId: item
                })
            }
        })

        setDislikeCounts(dislikesArr)
    }

    const fetchCommentsLikes = async () => {
        const { data } = await axios({
            method: 'GET',
            url: 'https://feedback-5b3e5-default-rtdb.firebaseio.com/commentsLikes.json'
        })

        const commentsLikesArr = []

        data && Object.keys(data)?.map((item) => {
            const foundedRecord = commentsLikesArr.find((ss) => ss.id === data[item].commentId)
            const foundedRecordIndex = commentsLikesArr.findIndex((ss) => ss.id === data[item].commentId)

            if (foundedRecord) {
                commentsLikesArr[foundedRecordIndex].count += 1
            } else {
                commentsLikesArr.push({
                    count: 1,
                    id: data[item].commentId,
                    parentId: item
                })
            }
        })

        setCommentsLikes(commentsLikesArr)

    }

    const fetchCommentsDislikes = async () => {

        const { data } = await axios({
            method: 'GET',
            url: 'https://feedback-5b3e5-default-rtdb.firebaseio.com/commentsDislikes.json'
        })

        const commentsDislikesArr = []

        data && Object.keys(data)?.map((item) => {
            const foundedRecord = commentsDislikesArr.find((ss) => ss.id === data[item].commentId)
            const foundedRecordIndex = commentsDislikesArr.findIndex((ss) => ss.id === data[item].commentId)

            if (foundedRecord) {
                commentsDislikesArr[foundedRecordIndex].count += 1
            } else {
                commentsDislikesArr.push({
                    count: 1,
                    id: data[item].commentId,
                    parentId: item
                })
            }
        })

        setCommentsDislikes(commentsDislikesArr);
    }

    const fetchListing = async () => {
        const resp = await axios({
            method: 'GET',
            url: 'https://feedback-5b3e5-default-rtdb.firebaseio.com/something.json'
        });

        const mappedData = Object.keys(resp?.data).map((item) => {
            return {
                ...resp.data[item],
                id: item,
            };
        });
        setFeedbackList(mappedData);
    };

    const fetchComments = async () => {

        const resp = await axios({
            method: 'GET',
            url: 'https://feedback-5b3e5-default-rtdb.firebaseio.com/comment.json'
        });

        const mappedData = resp?.data && Object.keys(resp?.data)?.map((item) => {
            return { ...resp?.data[item], id: item }
        })

        setComments(mappedData)
    }

    useEffect(() => {
        fetchListing();
        fetchLikes();
        fetchDislikes();
        fetchComments();

        fetchCommentsLikes()
        fetchCommentsDislikes()
    }, []);

    const handleLike = async (item, parentId) => {
        let obj = {
            method: 'DELETE',
            url: `https://feedback-5b3e5-default-rtdb.firebaseio.com/likes/${parentId}.json`
        }
        setLikeLoading(true);
        if (!parentId) {
            obj.method = 'POST'
            obj.url = 'https://feedback-5b3e5-default-rtdb.firebaseio.com/likes.json'
            obj['data'] = JSON.stringify({ postId: item.id })
            setLikeLoading(true);
        }

        try {

            await axios({
                ...obj
            })
            setLikeLoading(false);

            await fetchLikes()
            toast.success('Liked successfully');
        } catch (error) {
            setLikeLoading(false);
            toast.error('Failed to like');
        }
    };

    const handleDislike = async (item, parentId) => {

        let obj = {
            method: 'DELETE',
            url: `https://feedback-5b3e5-default-rtdb.firebaseio.com/dislikes/${parentId}.json`
        }

        if (!parentId) {
            obj.method = 'POST'
            obj.url = 'https://feedback-5b3e5-default-rtdb.firebaseio.com/dislikes.json'
            obj['data'] = JSON.stringify({ postId: item.id })
            setDislikeLoading(true);
        }

        try {

            await axios({
                ...obj
            })
            setDislikeLoading(false);

            await fetchDislikes()
            toast.success('Disliked successfully');
        } catch (error) {
            console.log('this is the error: ', error)
        }
    };

    const handleComment = (index) => {
        if (commentedIndex === index) {
            setCommentedIndex(null);
            setCommentText('');
        } else {
            setCommentedIndex(index);
        }
    };

    const handleCommentInputChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async (item) => {

        console.log(item.description.value);
        if (commentText) {

            setCommentLoading(true);
            await axios({
                method: 'POST',
                url: 'https://feedback-5b3e5-default-rtdb.firebaseio.com/comment.json',
                data: JSON.stringify({
                    itemId: item.id,
                    commentText
                })
            })

            await fetchComments()
            toast.success('commented successfully');

            setCommentedIndex(null);
            setCommentText('');
            setCommentLoading(false);
        }
        else {
            toast.error('Please enter comment first');
        }
    };


    const commentLiked = async (commentId, parentId) => {

        let obj = {
            method: 'DELETE',
            url: `https://feedback-5b3e5-default-rtdb.firebaseio.com/commentsLikes/${parentId}.json`
        }

        if (!parentId) {
            obj.method = 'POST'
            obj.url = 'https://feedback-5b3e5-default-rtdb.firebaseio.com/commentsLikes.json'
            obj['data'] = JSON.stringify({ commentId })
        }

        try {
            await axios({
                ...obj
            })
            await fetchCommentsLikes()
        } catch (err) {
            console.log(err)
        }
    }

    const commentDisliked = async (commentId, parentId) => {


        let obj = {
            method: 'DELETE',
            url: `https://feedback-5b3e5-default-rtdb.firebaseio.com/commentsDislikes/${parentId}.json`
        }

        if (!parentId) {
            obj.method = 'POST'
            obj.url = 'https://feedback-5b3e5-default-rtdb.firebaseio.com/commentsDislikes.json'
            obj['data'] = JSON.stringify({ commentId })
        }


        try {
            await axios({
                ...obj
            })
            await fetchCommentsDislikes()
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <>



            <div className="container mt-16  mx-auto max-w-md">

                <div className="bg-white border-2 border-[#4C51BF] shadow-md rounded-md p-6 mb-8">
                    <h2 className="text-3xl font-bold mb-4">Feedback Listing</h2>
                    <Link to={'feedback'}>
                        <button className="px-4 py-2 text-sm font-semibold text-black bg-gray-200 rounded-lg border border-gray-300 transition duration-150 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">New Feedbacks</button>
                    </Link>
                </div>


                {feedbackList?.map((item, index) => (
                    <div key={index} className="feedback-item border border-[gray]  mb-8 border rounded p-4">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Title: {item.title}</h3>
                            <p className="mb-2 text-gray-800">Description: {item.description}</p>
                            <p className="text-gray-700">Category: {item.category}</p>
                        </div>
                        <div className="flex items-center mt-4">
                            <button
                                className={`px-4 py-2 mr-2 text-sm font-semibold text-white rounded-md ${likedIndex === index ? 'bg-blue-500' : 'bg-blue-400 hover:bg-blue-500'} ${likeLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                onClick={() => handleLike(item, likeCounts?.find((obj) => obj.id === item.id)?.parentId)}
                                disabled={likeLoading}
                            >
                                {likeLoading ? 'Loading...' : likedIndex === index ? 'Liked' : 'Like'} ({likeCounts?.find((obj) => obj.id === item.id)?.count || 0})
                            </button>
                            <button
                                className={`px-4 py-2 mr-2 text-sm font-semibold text-white rounded-md bg-red-500 hover:bg-red-600 ${dislikeLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                onClick={() => handleDislike(item, dislikeCounts?.find((obj) => obj.id === item.id)?.parentId)}
                                disabled={dislikeLoading}
                            >
                                {dislikeLoading ? 'Loading...' : `Dislike (${dislikeCounts?.find((obj) => obj.id === item.id)?.count || 0})`}
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-semibold text-white rounded-md ${commentedIndex === index ? 'bg-green-500' : 'bg-green-400 hover:bg-green-500'} ${commentLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                onClick={() => handleComment(index)}
                                disabled={commentLoading}
                            >
                                {commentLoading ? 'Loading...' : commentedIndex === index ? 'Close' : 'Comment'}
                            </button>
                        </div>



                        {commentedIndex === index && (
                            <div className="mt-4">
                                <textarea
                                    value={commentText}
                                    onChange={handleCommentInputChange}
                                    className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    placeholder="Write your comment here..."
                                />
                                <button
                                    className="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={() => handleCommentSubmit(item)}
                                >
                                    Submit Comment
                                </button>
                            </div>
                        )}


                        <div className="mt-4  ">
                            <h1 className='text-lg font-bold mb-2'>Comments</h1>
                            {comments?.map((comment) => {
                                return (
                                    comment.itemId === item.id && (
                                        <div key={comment.id} className="mb-4 p-4 border-2 border-[gray] bg-gray-100 rounded-lg shadow-md">
                                            <div className="flex items-center mb-2">
                                                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                                                <div className="ml-3">
                                                    <h1 className="text-base font-semibold">User</h1>
                                                    <p className="text-sm text-gray-800">{comment?.commentText}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    className={`px-3 py-1 mr-2 text-sm font-semibold text-white rounded-md ${likedIndex === index ? 'bg-blue-500' : 'bg-blue-400 hover:bg-blue-500'}`}
                                                    onClick={() => commentLiked(comment.id, commentsLikes?.find((obj) => obj.id === comment.id)?.parentId)}
                                                >
                                                    Like ({commentsLikes?.find((obj) => obj.id === comment.id)?.count || 0})
                                                </button>
                                                <button
                                                    className={`px-3 py-1 text-sm font-semibold text-white rounded-md bg-red-500 hover:bg-red-600`}
                                                    onClick={() => commentDisliked(comment.id, commentsDislikes?.find((obj) => obj.id === comment.id)?.parentId)}
                                                >
                                                    Dislike ({commentsDislikes?.find((obj) => obj.id === comment.id)?.count || 0})
                                                </button>
                                            </div>
                                        </div>
                                    )
                                );
                            })}
                        </div>

                    </div>
                ))}
            </div>






        </>
    );
};

export default FeedbackListing;

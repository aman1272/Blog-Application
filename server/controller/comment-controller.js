
import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    // console.log("step Comment new", request.body)

    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }

}


export const getComments = async (request, response) => {

    try {
        const comments = await Comment.find({ postId: request.params.id });

        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }

}

export const deleteComment = async (request, response) => {

    try {
        await Comment.findByIdAndDelete(request.params.id);
        response.status(200).json('comment deleted successfully');
    } catch (error) {
        console.log("step Failes")
        response.status(500).json(error)
    }
}
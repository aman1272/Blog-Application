
import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    console.log("step Comment new", request.body)

    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
    console.log("step Comment new end")

}


export const getComments = async (request, response) => {
    console.log("step Comment get", response.body)

    try {
        const comments = await Comment.find({ postId: request.params.id });

        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }

}

export const deleteComment = async (request, response) => {
    console.log("delete", request.body)

    try {
        console.log("step success")

        const comment = await Comment.findById(request.params.id);
        await comment.delete()

        response.status(200).json('comment deleted successfully');
    } catch (error) {
        console.log("step Failes")
        response.status(500).json(error)
    }
}
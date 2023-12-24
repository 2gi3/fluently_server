import PostComments from "../../models/community/post_comments.js";
import PostComment from "../../models/community/postComment.js";
export const createPostComment = async (req, res, next) => {
    console.log(req.body);
    // if (req.userId != req.body.userId) {
    //     res.status(403).json({ message: 'You are not authorised to create this Post' });
    // } else {
    const postComment = new PostComment({
        userId: req.body.userId,
        postId: req.body.postId,
        body: req.body.body,
    });
    const newPostComment = await postComment.save();
    await PostComments.create({ postId: newPostComment.postId, commentId: newPostComment.id });
    res.status(201).json({
        message: 'New postComment created successfully!',
        newPostComment
    });
    // }
};
//# sourceMappingURL=postComment.js.map
/**
 * Express router for managing comment resources.
 * @module routes/api/comments
 */

/**
 * GET /api/comments
 * @summary Retrieve all comments.
 * @description Fetches all comment documents from the database.
 * @function
 * @name getComments
 * @memberof module:routes/api/comments
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @returns {Promise<void>} 200 - Returns an array of comment documents in JSON format.
 * @throws 500 - Returns an error message if fetching comments fails.
 */

/**
 * DELETE /api/comments/:commentId
 * @summary Delete a specific comment.
 * @description Deletes a comment identified by its MongoDB ObjectId.
 * @function
 * @name deleteComment
 * @memberof module:routes/api/comments
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {string} req.params.commentId - The MongoDB ObjectId of the comment to delete.
 * @returns {Promise<void>} 200 - Returns a success message when the comment is deleted.
 * @throws 404 - Returns an error message if the comment is not found.
 * @throws 500 - Returns an error message if deleting the comment fails.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

//add another endpoint for deleting a comment
router.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

module.exports = router;
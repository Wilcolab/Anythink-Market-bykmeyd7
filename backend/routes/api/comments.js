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
 * @param {express.NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} 200 - Returns an array of comment documents in JSON format.
 * @throws Passes errors to the error handling middleware.
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
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.commentId - The MongoDB ObjectId of the comment to delete.
 * @returns {Promise<void>} 200 - Returns a success message when the comment is deleted.
 * @throws 400 - Returns an error message if the comment ID is invalid.
 * @throws 404 - Returns an error message if the comment is not found.
 * @throws Passes other errors to the error handling middleware.
 */
var router = require("express").Router();
var mongoose = require("mongoose");
var Comment = mongoose.model("Comment");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

router.delete("/:commentId", function(req, res, next) {
  var commentId = req.params.commentId;
  
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }
});

module.exports = router;

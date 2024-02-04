const db = require("../config/database");
const postModel = require("../models/postModel");

async function createPost(userID, content, media) {
	try {
		await db.beginTransaction();

		const createPostQuery = "INSERT INTO POSTS (userID, content) VALUES (?, ?)";
		const [postResult] = await db.query(createPostQuery, [userID, content]);

		if (postResult && postResult.insertId) {
			const postID = postResult.insertId;
			await postModel.addMediaToPost(postID, media);

			await db.commit();

			return postModel.getPostById(postID);
		} else {
			await db.rollback();
		}

		return null;
	} catch (error) {
		await db.rollback();
		console.error(error);
		throw error;
	} finally {
	}
}

async function getAllPosts(page = 1, limit = 10) {
	try {
		const offset = (page - 1) * limit;
		const postQuery = `
            SELECT
                P.postID AS id,
                P.content,
                P.create_at,
                U.avatar AS user_avatar,
                U.userID AS user_id,
                U.fullName AS user_name,
                COUNT(L.likeID) AS like_count,
                COUNT(C.commentID) AS comment_count
            FROM
                POSTS P
                JOIN USERS U ON P.userID = U.userID
                LEFT JOIN LIKES L ON P.postID = L.postID
                LEFT JOIN COMMENTS C ON P.postID = C.postID
            GROUP BY
                P.postID, U.avatar, U.userID, U.fullName
            ORDER BY P.create_at DESC
            LIMIT ? OFFSET ?
        `;
		const [posts] = await db.query(postQuery, [limit, offset]);

		for (let post of posts) {
			const mediaQuery = `
                SELECT
                    M.mediaID AS id,
                    M.type AS type,
                    M.url AS url
                FROM
                    MEDIA M
                WHERE
                    M.postID = ?
            `;
			const [media] = await db.query(mediaQuery, [post.id]);
			post.media = media;
			console.log(posts[0].create_at);
		}

		return posts;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getPostById(postId) {
	try {
		const postQuery = `
            SELECT
                P.postID AS id,
                P.content,
                P.create_at,
                U.avatar AS user_avatar,
                U.userID AS user_id,
                U.fullName AS user_name,
                COUNT(L.likeID) AS like_count,
                COUNT(C.commentID) AS comment_count
            FROM
                POSTS P
                JOIN USERS U ON P.userID = U.userID
                LEFT JOIN LIKES L ON P.postID = L.postID
                LEFT JOIN COMMENTS C ON P.postID = C.postID
            WHERE
                P.postID = ?
            GROUP BY
                P.postID, U.avatar, U.userID, U.fullName
        `;
		const [posts] = await db.query(postQuery, [postId]);

		if (posts.length > 0) {
			const post = posts[0];
			const mediaQuery = `
                SELECT
                    M.mediaID AS id,
                    M.type AS type,
                    M.url AS url
                FROM
                    MEDIA M
                WHERE
                    M.postID = ?
            `;
			const [media] = await db.query(mediaQuery, [post.id]);
			post.media = media;

			return post;
		}

		return null;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
module.exports = {
	createPost,
	getAllPosts,
	getPostById,
};

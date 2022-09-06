"use strict";

const { randomBytes } = require("crypto");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const commentsByPostId = {};
module.exports = {
	name: "comments",


	/**
	 * Settings
	 */
	settings: {


	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {


		read: {
			rest: {
				method: "GET",
				fullPath: "/posts/:id/comments"
			},
			params: {
				id: "string",
			},
			async handler(ctx) {
				//console.log(ctx)
				return commentsByPostId[ctx.params.id] || [];
			}
		},
		save: {
			rest: {
				method: "POST",
				fullPath: "/posts/:id/comments"
			},
			params: {
				id: "string",
				content: "string"

			},
			 handler(ctx) {
				const commentId = randomBytes(4).toString('hex');
				const time = Date.now();
				//console.log(ctx.params.id);
				//console.log(ctx.params.content);
				const comments = commentsByPostId[ctx.params.id] || [];
				comments.push({ id: commentId, content: ctx.params.content, status: "pending", timestamp: time });
				commentsByPostId[ctx.params.id] = comments;
				this.broker.emit("comment.created", { 'id': commentId, 'content': ctx.params.content, 'postId': ctx.params.id, 'status': 'pending', timestamp: time });
				return { 'id': commentId, 'content': ctx.params.content };
			}
		},

	},

	/**
	 * Events
	 */
	events: {
		"comment.moderated": {
			// Validation schema
			params: {
				id: "string",
				content: "string",
				postId: "string",
				status: "string"
			},
			handler(ctx) {
				const time = Date.now();
				this.logger.info("Event received ", ctx.event.name);
				this.logger.info("params", ctx.event.params);
				const comments = commentsByPostId[ctx.params.postId] || [];
				const comment = comments.find(comment => { return comment.id === ctx.params.id });
				this.logger.info("received moderated comment:", ctx.params.content, ctx.params.status)
				var status = ctx.params.status;
				comment.status = status;
				comment.timestamp = time
				this.logger.info("new comment:", comment)
				this.broker.emit("comment.updated", { 'id': ctx.params.id, 'content': ctx.params.content, 'postId': ctx.params.postId, 'status': status, timestamp: time });
				//await ctx.broker.broadcast("comment.moderated", {'id':commentId,'content':ctx.params.content,'postId':ctx.params.id,status});
				return;
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		this.settings.posts = {}
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};

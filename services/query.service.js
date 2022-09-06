"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const posts = {};
module.exports = {
	name: "query",

	/**
	 * Settings
	 */
	settings: {


	},

	/**
	 * Dependencies
	 */
	dependencies: [],
	events: {
		"post.created": {
			// Validation schema
			params: {
				id: "string",
				title: "string"
			},
			handler(ctx) {
				this.logger.info("Event received, parameters OK!", ctx.event.name);

				posts[ctx.params.id] = { "id": ctx.params.id, "title": ctx.params.title, comments: [] };
				return;
			}
		},
		"comment.created": {
			// Validation schema
			params: {
				id: "string",
				content: "string",
				postId: "string",
				status: "string",
				timestamp: "number"
			},
			handler(ctx) {
				this.logger.info("Event received, parameters OK!", ctx.event.name);
				this.logger.info("params:", ctx.params)
				this.logger.info("status:", ctx.params.status);
				const approved = ctx.params.status;
				var post = posts[ctx.params.postId];

				const comments = post.comments;
				var comment = comments.find(comment => { return comment.id === ctx.params.id });
				if (comment == null) {
					comment = { "id": ctx.params.id, "content": ctx.params.content, "status": ctx.params.status, time: ctx.params.timestamp }
					comments.push(comment);
					this.logger.info("Comment created:", comment)
				} else { this.logger.info("Comment updated:", comment) }


				posts[ctx.params.postId] = { "id": post.id, "title": post.title, comments }
				return;
			}
		},
		"comment.updated": {
			// Validation schema
			params: {
				id: "string",
				content: "string",
				postId: "string",
				status: "string",
				timestamp: "number"
			},
			handler(ctx) {
				this.logger.info("Event received, parameters OK!", ctx.event.name);
				this.logger.info("params:", ctx.params);

				var post = posts[ctx.params.postId];

				const comments = post.comments;
				var comment = comments.find(comment => { return comment.id === ctx.params.id });

				if (comment == null) {
					
					comment = { "id": ctx.params.id, "content": ctx.params.content, "status": ctx.params.status,"timestamp":ctx.params.timestamp }
					comments.push(comment);
					this.logger.info("Comment created:", comment)
				}else if ( comment.timestamp < ctx.params.timestamp){
					comment = { "id": ctx.params.id, "content": ctx.params.content, "status": ctx.params.status,"timestamp":ctx.params.timestamp }
					this.logger.info("Comment created, timestamp:", comment);
					comments.push(comment);
				
				} else {
					
					comment.status = ctx.params.status;
					comment.content = ctx.params.content;
					comment.timestamp = ctx.params.timestamp;
					this.logger.info("Comment updated:", comment)
				}


				posts[ctx.params.postId] = { "id": post.id, "title": post.title, comments };
				return;
			}
		}

	},
	/**
	 * Actions
	 */
	actions: {


		get: {
			rest: {
				method: "GET",
				fullPath: "/posts"
			},
			handler() {
				return posts;
			}
		},


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

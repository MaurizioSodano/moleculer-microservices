"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */


module.exports = {
	name: "moderation",

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
		"comment.created": {
			// Validation schema
			params: {
				id: "string",
				content: "string",
				postId: "string",
				status: "string",
				timestamp:"number"
			},
			handler(ctx) {
				this.logger.info("Event received, parameters OK!", ctx.event.name);
				const approval = ctx.params.content.includes("orange") ? "rejected" : "approved";

				this.logger.info("content:", ctx.params.content, ", status:", approval)
				const newComment={ 'id': ctx.params.id, 'content': ctx.params.content, 'postId': ctx.params.postId, 'status': approval , timestamp: ctx.params.timestamp}
				this.logger.info("new comment:",newComment)
				ctx.broker.broadcast("comment.moderated",newComment );
				return;
			}
		}

	},
	/**
	 * Actions
	 */




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

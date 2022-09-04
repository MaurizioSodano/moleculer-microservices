"use strict";

const {randomBytes} = require("crypto");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const commentsByPostId={};
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
				path: "/posts/:id/comments"
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
				path: "/posts/:id/comments"
			},
			params: {
				id: "string",
				content:"string"
				
			},
			async handler(ctx) {
				const commentId=randomBytes(4).toString('hex');
				//console.log(ctx.params.id);
				//console.log(ctx.params.content);
				const comments=commentsByPostId[ctx.params.id] || [];
				comments.push({id:commentId, content:ctx.params.content});
				commentsByPostId[ctx.params.id] =comments;

				return  {'id':commentId,'content':comments};
			}
		},

	},

	/**
	 * Events
	 */
	events: {

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
		this.settings.posts={}
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

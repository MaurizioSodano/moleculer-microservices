"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const posts={};
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
		"post.created":{
			// Validation schema
			params: {
				id: "string",
				title: "string"
			},
			handler(ctx){
				this.logger.info("Event received, parameters OK!", ctx.params);
				console.log(ctx.params);
				posts[ctx.params.id]={"id":ctx.params.id ,"title":ctx.params.title} 
			}
		},

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
			async handler() {
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

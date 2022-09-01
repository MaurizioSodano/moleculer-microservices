"use strict";

const {randomBytes} = require("crypto");
/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

const posts={};
module.exports = {
	name: "posts",

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


		getposts: {
			rest: {
				method: "GET",
				path: "/"
			},
			async handler() {
				return posts;
			}
		},
		saveposts: {
			rest: {
				method: "POST",
				path: "/"
			},
			params: {
				title: "string",
				
			},
			async handler(ctx) {
				const id=randomBytes(4).toString('hex');
				console.log(ctx.params.title);
				
				posts[id]=ctx.params.title;

				return {'id':id,'title':posts[id]};
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

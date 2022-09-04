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


		get: {
			rest: {
				method: "GET",
				path: "/"
			},
			async handler() {
				return posts;
			}
		},
		create: {
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
				const title=ctx.params.title;
				posts[id]={id ,title};

				return {'id':id,'title':title};
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

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
				console.log("Event received, parameters OK!", ctx.params);
				
				posts[ctx.params.id]={"id":ctx.params.id ,"title":ctx.params.title, comments:[]} 
			}
		},
		"comment.created":{
				// Validation schema
				params: {
					id: "string",
					content: "string",
					postId:"string"
				},
				handler(ctx){
					console.log("Event received, parameters OK!", ctx.params);
					var post=posts[ctx.params.postId];
	
					var comments=post.comments;
	
					comments.push({"id":ctx.params.id,"content":ctx.params.content});
		
					posts[ctx.params.postId]={"id":post.id ,"title":post.title,comments}
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

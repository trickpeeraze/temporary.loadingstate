(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof exports?module.exports=a():a()}(function(){var a=function(){this.debug=!0};return a.prototype.renderTemplate=function(a,b){this.isDefined(b)||(b={});var c={};for(var d in b)if("object"==typeof b[d]){for(var e in b[d])c[d+"."+e]=["{"+d+"."+e+"}",b[d][e]]}else c[d]=["{"+d+"}",b[d]];for(var d in c)a=a.replace(new RegExp(c[d][0],"g"),c[d][1]);return a},a.prototype.log=function(a){this.debug&&console.log(a)},a.prototype.isFunction=function(a){return"function"==typeof a},a.prototype.isDefined=function(a){return"undefined"!=typeof a},a.prototype.isUndefined=function(a){return"undefined"==typeof a},a.prototype.fire=function(a,b){if(this.isFunction(a)){this.isDefined(b)||(b=null);var c=Array.prototype.slice.call(arguments);c.shift(),c.shift(),a.apply(b,c)}},new a});
},{}],2:[function(require,module,exports){
/**
 * Loading State
 * -------------
 * Script to set loading state to the button or text when doing some progress.
 *
 * @author Siraphob Rhompo
 * @copyright	Alright reserved by Enegist 2014.
 * @license		MIT
 * 
 */
(function (factory) {

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }	
	
})(function($){
	
	var enegist = require('enegist');

	$.fn.loadingState = function(options){
		"use strict";
		
		/**
		 * 	@param {number} speed		- time of animated each frame
		 * 	@param {string} loadingText	- text shown when loading state is triggered
		 * 	@param {object} animated	- setting a simple text animation of loading state
		 * 	@param {string} frame[]		- an array of each frame, item must be matched with step option
		 *	@param {string} side		- choose [left|right|both] which side to display the frame
		 */
		var defaults = {
			speed: 500,
			loadingText: 'Loading',
			animated: {
				frame: ['','.','..','...'],
				side: 'right'
			}
		};
		
		var o = $.extend( {}, defaults, options );
		var $ele = this;
		
		$ele.setElementText = function(text){
			return this.is( 'input' ) ? this.val(text) : this.html(text);
		}
		$ele.getElementText = function(){
			return this.is( 'input' ) ? this.val() : this.text();
		}
		
		var timer, startClass, stopClass;
		var oldText		= $ele.getElementText();
		var align		= $ele.css('textAlign');
		var numFrame	= o.animated.frame.length;
		var state		= [];
		var space		= this.is( 'input' ) ? ' ' : '&nbsp;';
		
		for(var i = 0; i < numFrame; i++){
			var t;
			switch (o.animated.side){
				case 'both':
					t = o.animated.frame[i] + o.loadingText + o.animated.frame[i];
					break;
				case 'right':
					if(align === 'left')
						t = o.loadingText + o.animated.frame[i];
					else
						t = space.repeat( o.animated.frame[i].length ) + o.loadingText + o.animated.frame[i];
					break;
				case 'left':
				default:
					if(align === 'left')
						t =  o.animated.frame[i] + o.loadingText + space.repeat( o.animated.frame[i].length );
					else
						t =  o.animated.frame[i] + o.loadingText;
					break;
			}
			state.push( t );
		}
		
		var api = {};
		
		// Methods
		//
		// base functions
		api.start = function(){ start(''); };
		api.stop = function(text, duration, callback){ stop('', text, duration, callback); };
		
		// Progressing functions
		api.progress = function(){ start('progress') };
		api.done = function(text, duration, callback){ stop('success', text, duration, callback); };
		api.fail = function(text, duration, callback){ stop('error', text, duration, callback); };
		
		function start(status){
			if(!timer) {
				startClass = status;

				var count = numFrame;

				$ele
				  .removeClass(stopClass)
				  .addClass(status)
				  .addClass('disabled')
				  .prop( 'disabled', true )
				  .text(o.loadingText);
			
				timer = setInterval(function(){
					$ele.setElementText( state[count % numFrame] );
					count++;
				}, o.speed);
			}
		}
		
		function stop(status, text, duration, callback){
			stopClass = status;
			
			clearInterval(timer);
			timer = null;
			
			$ele
			  .removeClass(startClass)
			  .addClass(status)
			  .setElementText( text || oldText );
			
			if( typeof duration !== undefined && duration === parseInt(duration) ){
				setTimeout(function(){
					$ele
					  .removeClass(status)
					  .removeClass('disabled')
					  .prop('disabled', false)
					  .setElementText( oldText );
					if(typeof callback === 'function') {
						callback.call($ele[0]);
					}
				}, duration)
			} else {
				$ele.prop('disabled', false);
			}
		}
		
		return api;
	};
	
	if( enegist.isUndefined(String.repeat) ) {
		String.prototype.repeat = function(times) {
		   return (new Array(times + 1)).join(this);
		};
	}

});
},{"enegist":1}]},{},[2]);

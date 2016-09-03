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
(function (factory, $) {

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory;
    } else {
        // Browser globals
        factory($);
    }	
	
})(function($){
	"use strict";
	
	var enegist = require('enegist');

	$.fn.loadingState = function(options){
		
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

}, jQuery);
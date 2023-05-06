/**
 * ~~~ ANIMATE LETTERS JS ~~~
 *
 * Script for wrap letters of a text with a <span> tag
 * and add or remove CSS classes from thoses spans tags.
 *
 * Copyright: Raphaël Castello, 2023
 * Web/contact: www.sns.pm
 * License: GNU AGPL (open source)
 * Script: animate_letters.js
 * Version: 1.0.0
 * GitHub : https://github.com/Raf-sns/Animate-Letters-JS
 */


/**
 *
 * 1 - Define options :
 *
 * var LTR_options = {
 *
 *			 // add class(es) list 'class_1 class_2' or ''
 *			 prepare : 'letters_in_top',
 *			 // classes to add by phases
 *			 // set : []  |  ['class_a']  |  ['class_a','class_b']
 *			 add : [
 *				 // phase 1
 *				 [],
 *				 // phase 2
 *				 ['rotate_letters', 'space_letters'],
 *				 // phase 3 ...
 *				 []
 *			 ],
 *			 // classes to remove by phases arrays of classes
 *			 // set : []  |  ['class_a']  |  ['class_a','class_b']
 *			 remove : [
 *				 // phase 1
 *				 ['letters_in_top'],
 *				 // phase 2
 *				 [],
 *				 // phase 3 ...
 *				 ['space_letters']
 *			 ],
 *			 // timers by phases -> array of objects
 *			 // set : { delay : [integer in milliseconds],
 *			 //  				increment_delay : [integer in milliseconds] }
 *			 timers : [
 *				 { delay : 0,   increment_delay : 60 },
 *				 { delay : 100, increment_delay : 40 },
 *				 { delay : 80,  increment_delay : 30 }
 *			 ],
 *			 // remove spans who wrapped letters at the end of last phase
 *			 // set : true / false
 *			 clean_after : true,
 *			 // function to launch at the end of the last phase
 *			 // set : your_function() or null
 *			 end_callBack : function(){
 *
 *					 document.querySelector('.title_to_animate')
 *					 .classList.add('callback_anim');
 *			 }
 *
 *	 };
 *
 *
 * 2 - Use :
 *
 *  // initialize animate_letters
 *  var letters = animate_letters( 'h1#my_title', LTR_options );
 *  // run animate_letters
 *  letters.run();
 *
 */


	/**
	 * animate_letters( element, options )
	 * @param  {string}		element		html element
	 * @param  {array}		options 	Object of options
	 * @return {instance}
	 */
	const animate_letters = ( element, options ) => {



			// errors - stop on error
			this.error = false;

			// error - element not found
			if( !document.body.contains(document.querySelector(element)) ){

					console.error( `Animate letters : Element `+element+` is not defined, check please ...`);

					// set error to true
					this.error = true;
			}

			// error - no options found
			if( !options
			|| options.add === undefined
			|| options.remove === undefined ){

					console.error( `Animate letters : Please, provide an object of options`);

					// set error to true
					this.error = true;
			}

			// error - no same phases numbers
			if( options.add.length != options.remove.length ){

					console.error( `Animate letters : Please, provide the same number of arrays for adding and removing phases`);

					// set error to true
					this.error = true;
			}
			// end errors



			/**
			 * this.prepare();
			 * @return {html}	wrap text element with spans
			 */
			this.prepare = () => {


					// get the text
					var text =
						document.querySelector(element).innerHTML;
					const regx_1 = /(<br>)/gm;
					const regx_2 = /(&amp;)/gm;
					text = text.replace(regx_1, 'ø');
					text = text.replace(regx_2, '& ');
					// console.log( text );

					// make an array from text
					var Text = text.trim().split('');

					// new html with spans to insert
					var new_html = '';

					// loop Text array for set good html wanted
					Text.forEach((item, i) => {

							if( item == 'ø' ){

									// re-insert <br> tags -> no wrap
									new_html += '<br>';
							}
							else if( item == ' ' ){

									// just add space -> no wrap
									new_html += item;
							}
							else{

								// if need to add classes
								if( options.prepare.length != 0 ){

										// wrap with spans and classes
										new_html+= `<span class="`+options.prepare+`">`+item+`</span>`;
								}
								else{

										// just wrap with spans
										new_html+= `<span>`+item+`</span>`;
								}

							}
							// end else -> to wrap

					});
					// END loop Text


					// insert new html with spans
					document.querySelector(element).innerHTML = new_html;

			}
			/**
			 * end prepare()
			 * @return {html}	wrap text element with spans
			 */


			// array of letters wrapped with spans
			this.Letters = [];

			// index for sibling phases
			this.Indx = 0;


			/**
			 * this.run();
			 * @return {void}	add or remove classes from spans
			 */
			this.run = () => {


					// on error - return
					if( this.error ){
						return;
					}


					// base delay - fire first letter with a delay
					if( options.timers[this.Indx] === undefined
					|| options.timers[this.Indx].delay === undefined ){

							// set a delay to start by default if not defined
							this.delay_time = 0;

							// throw a message
							console.info(`Animate letters : No value found for the timer delay of this phase, the default value 0 was used`);
					}
					else{

							// set a delay to start
							this.delay_time = options.timers[this.Indx].delay;
					}


					// set increment delay for ech phases - default : 100
					// manage increment_delay not setted
					if( options.timers[this.Indx] === undefined
					|| options.timers[this.Indx].increment_delay === undefined ){

							// set an increment_delay value by default
							this.increment_delay = 100;

							// throw a message
							console.info(`Animate letters : No value found for the timer of this phase, the default value was used`);
					}
					else{

							// set increment_delay
							this.increment_delay = options.timers[this.Indx].increment_delay;
					}


					// sibling letters wrapped with spans - array
					this.Letters =
						document.querySelectorAll( ''+element+' span' );


					// array of setTimeout() -> for destroy them later
					var Lambda = [];


					// apply style to each letters with a delay
					this.Letters.forEach((item, i) => {

							// timeout
							Lambda[i] = setTimeout(function(){


									// clear timeout
									clearTimeout( Lambda[i] );


									// add or remove classes
									if( options.add[this.Indx].length != 0 ){

											// add classes
											item.classList.add(...options.add[this.Indx]);

									}
									if( options.remove[this.Indx].length != 0 ){

											// remove classes
											item.classList.remove(...options.remove[this.Indx]);
									}

									// if last index
									if( i == this.Letters.length-1  ){

											// increment phase index
											this.Indx++;

											// finish : chain next phase || callback_function()
											// || remove <span> tags || end
											this.end();
									}
									// end last index

							}, this.delay_time );
							// end timeout

							// add delay to timer
							this.delay_time += this.increment_delay;

					});
					// end loop Letters

			}
			/**
			 * end this.run();
			 */



			/**
			 * this.end();
			 * @return {void}	Re-run the fonction this.run() for start a new loop
			 * OR listen for transitionend or animationend events
			 * FOR 1/ run a callback function ( options.end_callBack() )
			 *     2/ clean <span> tags  at the end of events
			 * 				-> if it's asked ( options.clean_after = true )
			 * 				-> else keep text of the element wrapped by <span> tags
			 * Note : this.Letters = all <span> tags of the element
			 */
			this.end = () => {


					// chain
					if( this.Indx <= options.add.length-1 ){

							// re-run function
							this.run();

							return;
					}

					// watch for the end of the animation
					// or transition of the last letter
					var last_index = this.Letters.length-1;

					// put an event on transition end
					this.Letters[last_index].ontransitionend = () => {

							// console.log('End of last transition of last letter');

							// callback
							if( typeof options.end_callBack === 'function' ){

									// launch callback function
									options.end_callBack();
							}

							// if ( options.clean_after = true ) -> remove <span> tags
							// after last transition end
							// else -> do nothing and keep letters wrapped by <span> tags
							this.remove_spans();

					}
					// end make something on transition end


					// event listener animationend
					this.Letters[last_index].onanimationend = () => {

							// console.log('End of last animation of last letter');

							// callback
							if( typeof options.end_callBack === 'function' ){

									// launch callback function
									options.end_callBack();
							}

							// if ( options.clean_after = true ) -> remove <span> tags
							// after last animation end
							// else -> do nothing and keep letters wrapped by <span> tags
							this.remove_spans();

					}
					// end event listener animationend

			}
			/**
			 * end this.end()
			 */



			/**
			 * this.remove_spans();
			 * un-wrap letters if options.clean_after = true
			 */
			this.remove_spans = () => {


					// don't remove <span> tags
					if( options.clean_after == false ){
							return;
					}

					// un-wrap <span> tags
					this.Letters.forEach((item, i) => {

							item.replaceWith( ...item.innerText );
					});

			}
			/**
			 * this.remove_spans();
			 */



			// prepare letters - wrap all letters by a <span> tag
			// + add a first class to each if it's needed
			this.prepare();


			// return instance
			return this;


	}
	/**
	 * END animate_letters( element, options )
	 * @param  {string}		element		html element
	 * @param  {array}		options 	Object of options
	 * @return {instance}
	 */

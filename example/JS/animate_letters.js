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
 * Version: 2.0.0
 *
 * animate_letters( element, Options ) -> return instance
 * this.error : handling some errors
 * this.element_memorized = '';
 * this.memorize_element(); -> memorize element.outerHTML
 * this.hide_element_before(); -> if need to hide text before
 * this.text_memorized = ''; -> for keep memorized innerHTML of element
 * this.prepare(); -> wrap with <span> + add classes to <span> elements before animation
 * this.Letters = []; -> array of letters wrapped with <span>
 * this.Indx = 0; -> index for sibling phases
 * this.stop = false; -> stop in progress
 * this.run(); -> add or remove classes from spans by phases
 * this.end(); -> run a function at the end of animation's phases
 * this.remove_spans(); -> remove <span> who wrap text at the end of events
 * this.re_init(); -> reset element as at start
 * Launch : this.prepare();
 * return this;
 *
 */


	/**
	 * animate_letters( element, Options )
	 * @param  {string}		element		html element
	 * @param  {array}		Options 	Object of options
	 * @return {instance}
	 */
	const animate_letters = ( element, Options ) => {


			// manage errors

			// errors - stop on error
			this.error = false;

			// error - element not found
			if( !document.body.contains(document.querySelector(element)) ){

					console.error( `Animate letters : Element `+element+` is not defined, check please ...`);

					// set error to true
					this.error = true;
			}

			// error - no Options found
			if( !Options
			|| Options.add === undefined
			|| Options.remove === undefined ){

					console.error( `Animate letters : Please, provide an object of Options`);

					// set error to true
					this.error = true;
			}

			// error - no same phases numbers
			if( Options.add.length != Options.remove.length ){

					console.error( `Animate letters : Please, provide the same number of arrays for adding and removing phases`);

					// set error to true
					this.error = true;
			}

			// end manage errors



			/**
			 * for keep memorized element as at start
			 */
			this.element_memorized = '';


			/**
			 * this.memorize_element();
			 * memorize element as at start
			 * @return {void}
			 */
			this.memorize_element = () => {

					this.element_memorized = document.querySelector(element).outerHTML;
			}
			/**
			 * end this.memorize_element();
			 */



			/**
			 * this.hide_element_before();
			 * @return {void}	display text visibility hidden
			 * before on prepare animation
			 */
			this.hide_element_before = () => {

					document.querySelector(element).style.visibility = 'hidden';
			}
			/**
			 * end this.hide_element_before();
			 */



			/**
			 * for keep memorized innerHTML of element
			 */
			this.text_memorized = '';


			/**
			 * this.prepare();
			 * @return {html}	wrap text of element with spans
			 */
			this.prepare = () => {


					// memorize element before
					this.memorize_element();

					// hide text before ?
					if( Options.hide_element_before == true ){

							this.hide_element_before();
					}

					// get the text
					var text =
						document.querySelector(element).innerHTML;

					// memorize HTML of element
					this.text_memorized = text;

					const regx_1 = /(<br>)|(<br\/>)/gm;
					const regx_2 = /(&amp;)/gm;
					text = text.replaceAll(regx_1, 'ø');
					text = text.replaceAll(regx_2, '&');
					// console.log( text );

					// make an array from text
					var Text = text.trim().split('');

					// new html with spans to insert
					var new_html = '';

					// loop Text array for set good html wanted
					Text.forEach((item, i) => {

							if( item == 'ø' ){

									// re-insert <br> tags -> no wrap
									new_html += '<br/>';
							}
							else if( item == ' ' ){

									// just add space -> no wrap
									new_html += item;
							}
							else{

								// if need to add classes previously
								if( Options.prepare.length != 0 ){

										// wrap with spans and classes
										new_html+= `<span class="`+Options.prepare+`">`+item+`</span>`;
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
			 * end this.prepare();
			 */


			// array of letters wrapped with spans
			this.Letters = [];

			// index for sibling phases
			this.Indx = 0;

			// stop in progress
			this.stop = false;


			/**
			 * this.run();
			 * @return {void}	add or remove classes from spans
			 */
			this.run = () => {


					// on error - return
					if( this.error ){
						return;
					}

					// show element if is hidden
					if( Options.hide_element_before == true ){

							document.querySelector(element).style.visibility = 'visible';
					}

					// base delay
          if( Options.timers[this.Indx] === undefined
              || Options.timers[this.Indx].delay === undefined ){

                this.delay_time = 0;
          }
          else{
                this.delay_time = 0;
                this.delay_time += Options.timers[this.Indx].delay;
          }

					// set increment delay for each phases - default : 100
					// manage increment_delay not setted
					if( Options.timers[this.Indx] === undefined
              || Options.timers[this.Indx].increment_delay === undefined ){

							// set an increment_delay value by default
							this.increment_delay = 100;

							// throw a message
							console.info(`Animate letters : No value found for the timer of this phase, the default value was used`);
					}
					else{

							// set increment_delay
							this.increment_delay = Options.timers[this.Indx].increment_delay;
					}


					// sibling letters wrapped with spans - array
					this.Letters =
						document.querySelectorAll( ''+element+' span' );


					// array of setTimeout() -> for clear them later
					var TimeOutIds = [];


					// apply style to each letters with a delay
					// use (for of) for enable break statement
					for( const [i, item] of this.Letters.entries() ){


							// stop in progress
							if( this.stop == true ){

									// clear timeout
									window.clearTimeout( TimeOutIds[i-1] );

                  // reset index
									this.Indx = 0;

                  // empty letters array
                  this.Letters = [];

                  // stop here
									break;
							}

							// timeout
							TimeOutIds[i] = window.setTimeout(function(){

									// stop here if hard reset
									if( typeof Options.add[this.Indx] === 'undefined'
									|| typeof Options.remove[this.Indx] === 'undefined' ){

											return;
									}

                  // stop in progress - need to stop here too
    							if( this.stop == true ){

    									// clear timeout
    									window.clearTimeout( TimeOutIds[i] );

                      // reset index
    									this.Indx = 0;

                      // empty letters array
                      this.Letters = [];

    									// stop here
    									return;
    							}

									// add classes
									if( typeof Options.add[this.Indx] !== 'undefined'
									&& Options.add[this.Indx].length != 0 ){

											// add classes
											item.classList.add(...Options.add[this.Indx]);
									}

									// remove classes
									if( typeof Options.remove[this.Indx] !== 'undefined'
									&& Options.remove[this.Indx].length != 0 ){

											// remove classes
											item.classList.remove(...Options.remove[this.Indx]);
									}

									// if last index
									if( i == this.Letters.length-1  ){

											// increment phase index
											this.Indx++;

											// finish - chain | callback_function() | end
											this.end();
									}
									// end last index

									// clear timeout
									window.clearTimeout( TimeOutIds[i] );

							}, this.delay_time );
							// end timeout


							// add delay to timer
							this.delay_time += this.increment_delay;

					};
					// end loop Letters

			}
			/**
			 * end this.run();
			 */



			/**
			 * this.end();
			 * @return {void}	listen for transitionend
			 * and animationend events -> clean at the end of events
			 * -> if it's asked ( Options.clean_after = true )
			 * else : keep text of the element wrapped by <span> tags
			 * Note : this.Letters = all <span> tags of the element
			 */
			this.end = () => {


					// watch for the end of the animation
					// or transition of the last letter
					var last_index = this.Letters.length-1;

          // stop in progress - need to stop here too
          if( this.stop == true ){

              // reset index
              this.Indx = 0;

              // empty letters array
              this.Letters = [];

              // cancel transition
              this.Letters[last_index].ontransitioncancel = () => { };

              // cancel animation
              this.Letters[last_index].onanimationcancel = () => { };

              // stop here
              return;
          }

          // base delay
          if( Options.timers[this.Indx] === undefined
              || Options.timers[this.Indx].delay === undefined ){

                this.phase_delay = 0;
          }
          else{
                this.phase_delay = 0;
                this.phase_delay += Options.timers[this.Indx].delay;
          }

          var TimeOutPhase = [];

					// chain - MANAGE PHASES DELAY BETWEEN Options.timers
					if( this.Indx <= Options.add.length-1 ){

              TimeOutPhase[this.Indx] = window.setTimeout(function(){

                  // re-run function
    							this.run();

                  // clear timeout
                  window.clearTimeout( TimeOutPhase[this.Indx] );

              }, this.phase_delay );

							// and stop here
							return;
					}


					// put an event on transition end
					this.Letters[last_index].ontransitionend = () => {

							// console.log('End of last transition');

							// callback
							if( typeof Options.end_callBack === 'function' ){

									// launch callback function
									Options.end_callBack();
							}

							// remove spans after last transition end
							this.remove_spans();

					}
					// end make something on transition end


					// event listener animationend
					this.Letters[last_index].onanimationend = () => {

							// console.log('End of last animation');

							// callback
							if( typeof Options.end_callBack === 'function' ){

									// launch callback function
									Options.end_callBack();
							}

							// remove spans after last animation end
							this.remove_spans();

					}
					// end event listener animationend

			}
			/**
			 * end this.end()
			 */



			/**
			 * this.remove_spans();
			 * un-wrap letters if Options.clean_after = true
			 */
			this.remove_spans = () => {

					// no clean spans if clean after = false
					if( Options.clean_after == false ){
							return;
					}

					// reset original HTML of element
					document.querySelector(element).innerHTML = this.text_memorized;
			}
			/**
			 * this.remove_spans();
			 */



			/**
			 * this.re_init();
			 * @return {html} reset DOM element as at start
			 */
			this.re_init = () => {

					// hard reset for break loop
					this.stop = true;

					// re-init index
					this.Indx = 0;

          // empty letters array
          this.Letters = [];

					// replace element into the DOM as at start
					document.querySelector(element).outerHTML = this.element_memorized;

					// hide text before ?
					if( Options.hide_element_before == true ){

							this.hide_element_before();
					}

					// prepare -> wrap text of element with <span>
					this.prepare();

					// enable loop
					this.stop = false;
			}
			/**
			 * end this.re_init();
			 */


			// prepare letters - wrap all letters by a span tag
			// + add a first class if it's needed
			this.prepare();

			// return instance
			return this;

	}
	/**
	 * END animate_letters( element, Options )
	 * @param  {string}		element		html element
	 * @param  {array}		Options 	Object of options
	 * @return {instance}
	 */

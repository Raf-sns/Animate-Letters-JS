
	// set animate_letters() options
	var Animate_letters_options = {

			// add class(es) list 'class_1 class_2' or ''
			prepare : 'letters_in_top',
			// classes to add by phases
			// set : []  |  ['class_a']  |  ['class_a','class_b']
			add : [
				// phase 1
				[],
				// phase 2
				['rotate_letters'],
				// phase 3
				['space_letters','color_letters'],
				// phase 4
				[]
			],
			// classes to remove by phases arrays of classes
			// set : []  |  ['class_a']  |  ['class_a','class_b']
			remove : [
				// phase 1
				['letters_in_top'],
				// phase 2
				[],
				// phase 3
				[],
				// phase 4
				['space_letters','color_letters']
			],
			// timers by phases -> array of objects
			// set : { 	delay : [integer in milliseconds],
			//  				increment_delay : [integer in milliseconds]  }
			timers : [
				{ delay : 0, increment_delay : 60 },  // phase 1
				{ delay : 100, increment_delay : 40 },  // phase 2
				{ delay : 80, increment_delay : 30 },  // phase 3
				{ delay : 0, increment_delay : 20 }   // phase 4
			],
			// remove spans who wrapped letters at the end of last phase
			// set : true / false
			clean_after : true,
			// function to launch at the end of the last phase
			// set : your_function() or null
			end_callBack : function(){

					// sibling text container
					var container_text = document.querySelector('.text_to_animate');

					// add a class
					container_text.classList.add('callback_anim');

					// remove after n seconds
					var Timer = setTimeout(()=>{

							container_text.classList.remove('callback_anim');

							clearTimeout( Timer );

					}, 800 );
			}

	};
	// end animate_letters() options


	// 1 - initialize animate_letters
	var letters = animate_letters( '.text_to_animate' , Animate_letters_options );

	// 2 - run when you want
	letters.run();

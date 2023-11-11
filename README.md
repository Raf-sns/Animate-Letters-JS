## Animate Letters


A small javaScript library to animate letters in a text.

This api wraps all the letters of a text with a `<span>` tag and adds or removes CSS animation classes to each letter according to a defined delay.


**It has some pretty cool options !**

\- It is usable with `<br>` line breaks in the text.

\- It can chain several series of animations.

\- At each iteration, it allows you to add or remove one or more CSS classes.

\- You can prepare the text in advance, to push it out of the document, for example, before launching a first animation phase.

\- The delay of each animation phase is individually adjustable.


**See on this page : [App Documentation](#app-documentation-).** |
**[How to use it ?](#how-to-use-it-).**


**See it in action (but surely you can do better than me!)**


![Animate Letters in action](/images/Anim_Letters.gif)




### How to use it ?

1. Donwload / Copy **animate_letters.js** in `dist/animate_letters.js`

2. Add the library to your project :

```html
<script src="JS/animate_letters.js" defer></script>
```

3. Create a style sheet with your animation classes :

ex. **exemple/CSS/demo.css**

```css
.text_to_animate {
  margin: 0;
  padding: 0;
  font-size: 3.5em;
  line-height: 1.5em;
  letter-spacing: 4px;
  text-align: center;
  color: #9fc95f;
  transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.text_to_animate span {
  display: inline-block;
  z-index: 100;
  position: relative;
  top: 0;
  opacity: 1;
  letter-spacing: 4px;
  transform: rotateY(0deg);
  transition: top 1s cubic-bezier(0.64, -0.16, 0.15, 1.64), opacity 1s linear, letter-spacing 0.1s linear, transform 1s ease;
}
.text_to_animate span.letters_in_top {
  top: -100vh;
  opacity: 0;
}
.text_to_animate span.rotate_letters {
  transform: rotateY(1080deg);
  transition: transform 2s ease-in-out, letter-spacing 1s linear;
}
.text_to_animate span.space_letters {
  letter-spacing: 12px;
  transition: letter-spacing 1s linear, transform 2s ease-in-out;
}
.text_to_animate span.color_letters {
  color: #bdd656;
  text-shadow: 0 0 6px #d5f35bc9;
}
.callback_anim {
  transform: rotateZ(-10deg) scale(1.2);
  transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
```

4. Add add the stylesheet of your classes to the document :

```html
<head>
 <!-- add text style classes -->
 <link rel="stylesheet" href="CSS/demo.css" as="style">
</head>
```

5. Set options for an instance of Animate Letters :

```javascript

// set animate_letters() options
var Animate_letters_options = {

  // hide element before run animation -> true, no hide -> false
  hide_element_before : false,
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
  // set : { delay : [integer in milliseconds],
  //  			 increment_delay : [integer in milliseconds]  }
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

```

6. initialize animate_letters( element, options ) :

```javascript

 var letters = animate_letters( '.text_to_animate' , Animate_letters_options );

```

7. run animate_letters() when you want :

```javascript

 letters.run();

```

8. You can reset the element to the original state to play it over and over again, or interrupt it midway by calling the re_init() function, as in the following example:

```javascript

 letters.re_init();

```

### App Documentation :

Function **animate_letters( element, options );**
| Parameter | Description |
| :--- | :--- |
| `element` | Target **one** element that contains text to animate by class name or id ex. '.my_text' or '#my_text'. *element may contain text or line break tags* `<br>`.  **note:** *If several elements share the same class only the first element in the DOM will be taken into account*. |
| `options` | An object that sets the options of the library, for example the timers or the arrays of classes to add or remove at each iteration. |

Object **options = { };**
| Property | Value |
| :--- | :--- |
| `hide_element_before` | This setting is used to hide the element before playing the letters animation. Set to `true` to hide the element during instantiation or to `false` to not hide the element during instantiation.
| `prepare` | This or these classes will be added as soon as the library is initialized by the `animate_letters(element, options);` function. You can add one or more classes as in HTML, in a character string **Set:** `'class_1 class_2'` or `''` to do nothing. *This can be useful to hide your text before animating it or to prepare classes that will be removed during an iteration.* |
| `add` | An array that contains arrays of classes to add. Each class array leads to an iteration. If you have two arrays of classes, the api will add the classes from the first array to each letter, then at the end it will start again at the first letter and add the classes from the second array. As many times as there are class tables. **Set:** `[]` or `['class_a']` or `['class_a','class_b']`. **note:** *You must have the same number of arrays for the properties of `add` and `remove`.* **You can put empty arrays `[],` as value** you might get be doing it. |
| `remove` | An array that contains arrays of classes to remove. Each class array leads to an iteration. If you have two arrays of classes, the api will remove the classes from the first array at each letter, then at the end it will start again at the first letter and remove the classes from the second array. As many times as there are class tables. **Set:** `[]` or `['class_a']` or `['class_a','class_b']`. **note:** *You must have the same number of arrays for the properties of `add` and `remove`.* **You can put empty arrays `[],` as value** you might get be doing it. |
| `timers` | An array containing a list of objects - For each iteration, set the timeout for class additions or subtractions on each letter. Here you need to provide a series of objects with the `delay` properties which indicates a delay time before the start of the loop and which will be incremented by `increment_delay`. The values to be indicated here are integers representing the value of the delay in milliseconds Ex. : '100'. **note:** *If you don't put as many objects as there are iterations, the `0` value will be taken into account by default for the delay before execution and the value `100` will be taken into account default count for delay increment.* **Set:** `{ delay: 0, increment_delay: 80 },{ delay: 100, increment_delay: 60 },...` |
| `clean_after` | **Set:** `true` / `false` - Pass this value to `true` so that at the end of the last iteration on the last letter, the api cleans up the code and removes the `<span>` that wrapped the letters. Pass this value to `false` to keep the letters of the text wrapped by `<span>` tags, as needed. |
| `end_callBack` | function to launch at the end of the last iteration - **Set:** `your_function()` or `null` |

### License :

Under GNU AGPL license - Free - Open Source - Share your changes with the community - Credit the author.

### Disclaimer :

**Be careful ! This is just a beta version for now.**

**Any contribution is welcome !**

###

Developed by @Raf-sns - [Raphaël Castello / SNS - Web et informatique](https://sns.pm)

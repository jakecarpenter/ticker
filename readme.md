# ticker #

## A simple js/css ticker. ##

### How to use: ###
1.  include the js file, and the base CSS.
2.  Add at least one object containing something to tick with the addHeadline() method. Can be an array of objects too.
3.  Use something to call the ticker.frame() method every frame. I suggest an implementation of requestAnimationFrame.
4.  For extra fun and profit: style it so it isn't so ugly.
 
### Known Issues: ###
Abysmal Documentation.
Some of the important features are not stubbed out.
No error handling/catching
Pretty dependent on styling.
Some issue manipulating the dom.

### Todo: ###
BIG CHANGE: use a 'ghost' div hooked up to socket/angular as the source for the ticker, then draw based on that. that way, angular can do its magic and we still do our animation.
Realtime control, using angular/socketjs
stats: run count, time on screen. (duration and timestamps)
pull from rss
pull by twitter keyword
censorkill (don't air bad stuff)* Potentially high overhead

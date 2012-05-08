README
======

Live version: http://zugaldia.github.com/schemer

Background
----------

This is an entry submitted to the "Scheme up Google I/O" competition. We had
48 hours to "Design and implement a Schemer Doodle using HTML5, CSS3 or any
other technology supported in Chrome":

- The original scheme: https://www.schemer.com/scheme/0k4mlpsl7nd7o/4nb3viskf26e6
- Contest rules: https://sites.google.com/site/schemeupio2012/home
- Winners announced: https://plus.google.com/102146313345435500422/posts/CL7uSoyvUHC 

This is the full code for the (awarded!) doodle, it uses a number of components:

- Twitter Bootstrap for the HTML5/CSS3/JS skeleton
- jQuery for the generic JS code
- A simple PHP script to generated the coordinates (see below)
- [d3.js](http://d3js.org/) for the visualization

The look and feel resembles Schemer's on purpose and reuses some of their images
and fonts (covered by their copyright).

So far it has only been tested in Chrome but it should work in any modern
web browser.

Generating the coordinates
--------------------------

The "pulsating logo" is made out of around 1,000 circles, logically we didn't
create the coordinates manually. To check how it works see
[coordinates/logo.php](https://github.com/zugaldia/schemer/blob/master/coordinates/logo.php).

License
-------

Feel free to contribute or use this code in your projects. See
[LICENSE.md](https://github.com/zugaldia/schemer/blob/master/LICENSE.md)
for more details.

Author
------

Antonio Zugaldia.

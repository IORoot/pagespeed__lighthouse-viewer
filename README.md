# Pagespeed Insights API JSON to Lighthouse-viewer

## The problem

When using the the Pagespeed Insights API you will receive back a JSON file with all of your results. 
This is great for parsing and using for various other things, but lacks the ability to render as an
HTML file without coding it yourself. 

Since the result object is actually using the lighthouse API to obtain the results, you can use the
[Lighthouse-viewer](https://googlechrome.github.io/lighthouse/viewer/) to render the output of the 
JSON file.

The *slight* caveat is that the viewer requires you to either paste in the results, a URL to a GIST
with the results, or manually specify a file through the file-upload GUI. There is no ability to 
specify a file to read and opene the report automatically. 

That's what this custom version of the viewer does. This is a clone of the `gh-pages` branch of 
the [lighthouse git repo](https://github.com/GoogleChrome/lighthouse/tree/gh-pages) with a little
custom JS that allows you to specify a file to open through a URL parameter.

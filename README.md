# Pagespeed Insights API JSON to Lighthouse-viewer

## The problem

When using the the [Pagespeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started) you will receive back a 
[JSON response](https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response_1) with all of your results. 
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

## Installation

Clone this repository into a webserver directory that you can access from Apache, NGINX, etc.. e.g. `/var/www/html/viewer`.
You should be able to see the viewer at `http://mydomain.com/viewer/` or wherever you have placed the directory.

`git clone https://github.com/IORoot/pagespeed-insights__lighthouse-viewer.git`

## Usage

1. Obtain a JSON result object from pagespeed insights API and write to a JSON file. e.g. `example_com.json` and put it somewhere in the web directory you installed the viewer. e.g. `/var/www/html/viewer/results`.
1. Access the viewer with the URL parameter `http://mydomain.com/viewer?file=results/example_com.json` and it should load the file.
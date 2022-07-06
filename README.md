
<div id="top"></div>

<div align="center">

<img src="https://svg-rewriter.sachinraja.workers.dev/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40mdi%2Fsvg%406.7.96%2Fsvg%2Flighthouse.svg&fill=%23F44B21&width=200px&height=200px" style="width:200px;"/>

<h3 align="center">Lighthouse-viewer</h3>

<p align="center">
Pagespeed Insights API JSON to Lighthouse-viewer.
</p>    
</div>

##  1. <a name='TableofContents'></a>Table of Contents


* 1. [Table of Contents](#TableofContents)
* 2. [About The Project](#AboutTheProject)
	* 2.1. [The problem](#Theproblem)
	* 2.2. [Built With](#BuiltWith)
	* 2.3. [Installation](#Installation)
* 3. [Usage](#Usage)
* 4. [ Customising](#Customising)
* 5. [Troubleshooting](#Troubleshooting)
* 6. [Contributing](#Contributing)
* 7. [License](#License)
* 8. [Contact](#Contact)
* 9. [Changelog](#Changelog)


##  2. <a name='AboutTheProject'></a>About The Project

###  2.1. <a name='Theproblem'></a>The problem

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



<p align="right">(<a href="#top">back to top</a>)</p>


###  2.2. <a name='BuiltWith'></a>Built With

This project was built with the following frameworks, technologies and software.

- [Pagespeed](https://pagespeed.web.dev/)
- [Lighthouse](https://github.com/GoogleChrome/lighthouse)
- [Lighthouse Viewer](https://googlechrome.github.io/lighthouse/viewer/)

<p align="right">(<a href="#top">back to top</a>)</p>


###  2.3. <a name='Installation'></a>Installation

Clone this repository into a webserver directory that you can access from Apache, NGINX, etc.. e.g. `/var/www/html/viewer`.
You should be able to see the viewer at `http://mydomain.com/viewer/` or wherever you have placed the directory.

`git clone https://github.com/IORoot/pagespeed-insights__lighthouse-viewer.git`

<p align="right">(<a href="#top">back to top</a>)</p>


##  3. <a name='Usage'></a>Usage

1. Obtain a JSON result object from pagespeed insights API and write to a JSON file. e.g. `example_com.json` and put it somewhere in the web directory you installed the viewer. e.g. `/var/www/html/viewer/results`.
1. Access the viewer with the URL parameter `http://mydomain.com/viewer?file=results/example_com.json` and it should load the file.

##  4. <a name='Customising'></a> Customising

None.

##  5. <a name='Troubleshooting'></a>Troubleshooting

None

<p align="right">(<a href="#top">back to top</a>)</p>


##  6. <a name='Contributing'></a>Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



##  7. <a name='License'></a>License

Distributed under the MIT License.

MIT License

Copyright (c) 2022 Andy Pearson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<p align="right">(<a href="#top">back to top</a>)</p>



##  8. <a name='Contact'></a>Contact

Author Link: [https://github.com/IORoot](https://github.com/IORoot)

<p align="right">(<a href="#top">back to top</a>)</p>

##  9. <a name='Changelog'></a>Changelog

v1.0.0 - First version.

# Nitrogen Admin Application

Nitrogen admin application for managing devices in Nitrogen and, for administrators, the Nitrogen service itself.

## Getting Started

The admin app is a statically served single page Ember.js application that works against the Nitrogen service API endpoint.

There is a hosted version of the admin tool for the free hosted version of Nitrogen at [https://admin.nitrogen.io](https://admin.nitrogen.io).

You can also run admin locally:

1. Install node.js and git if you haven't already.
2. We use yeoman for our build system.  Install this via `npm install -g yo grunt-cli bower`
3. Yeoman uses ruby (see http://www.ruby-lang.org/en/downloads/ to install) and compass (`gem install compass` to install) for building the twitter bootstrap CSS.
3. Install the node components with a `npm install` and the bower components with a `bower install`. 
4. Start the local server with `grunt server`.   This will host the application on your local machine, open a browser window to it, and refresh on changes.

To build admin for deployment:

1. Create a git repo at the same directory level as admin called admin-deploy: `mkdir admin-deploy && cd admin-deploy && git init`
2. In the admin project, navigate to the scripts directory: `cd scripts`
3. Build and minify the admin application: `./prep-admin-deployment`
4. This will populate admin-deploy with a built version of the application.  Commit this to the git repo and then push to your static web server.

## How to contribute

1.  Feedback:  We'd love feedback on what problems you are using Nitrogen to solve.  Obviously, we'd also like to hear about where you ran into sharp edges and dead ends.   Drop me a message at [timfpark@gmail.com](mailto:timfpark@gmail.com) or file an issue with us above.
2.  Pull requests:  If you'd like to tackle an issue, fork the repo, create a clean commit for the fix or enhancement with tests if necessary, and send us a pull request. This is also the path to becoming a core committer for the project for folks that are interested in contributing in more depth.
3.  Documentation:  Better technical documentation is key to broadening the use of the platform.   We'd love to have more help and this is one of the most valuable contributions you can make.

## Other Projects

Nitrogen has three other projects that you should have a look at as well.

1. [service](https://github.com/nitrogenjs/service): The core Nitrogen service responsible for managing users, devices, and messaging between them.
1. [client](https://github.com/nitrogenjs/client): The client library for building Nitrogen devices and applications.
3. [camera](https://github.com/nitrogenjs/camera): A sample device application that connects a camera to the Nitrogen service.

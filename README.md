# Image Repository
Built for Shopify's Fall 2020 internship backend challenge.  Uses MongoDB, Express, React, and NodeJS.

## Features
This current iteration of the repository allows the user to register and/or authenticate into the site.  Single images can be uploaded to the repository, where they will be displayed on the home page.  Images not associated with any account are by default public, whilst images uploaded by a user can be specified to be either private or public.  In the former case, they will only be visible to the user who uploaded them.

![Screenshot of homepage.](./screenshot1.png?raw=true)

## How to Run
1. Clone this git repository
2. `npm install`
3. `npm run backend`
4. `npm run frontend`

Application will be running at http://localhost:3000 (server will run at port 5000).

## Next Steps
The simplest next step would be to grant users the ability to delete images they've uploaded to the repository.  This can be easily accomplished by adding another endpoint that could handle a POST request containing specifications of the image that should be deleted, and then verifying the identity of the user by checking a token (in the same way that GET image requests are doing now to make sure that users are not able to access private images posted by others) before doing the actual deletion action.  It would also be a good idea to add in testing by bringing in test runners like Jest, etc.

# MediaSeeker - A social media matching platform

The goal of this website is to create a social media experience that is more meaningful than the platforms that are available today. User's post widgets that are representative of the media (music/movies/books/videogames) that they like. It has the features that are commonly associated with social media sites with the addition of being able to recommend media and recommend friends based on that media. 

## Hosting at
https://newmediamatch-madechai.c9users.io/

## Included software
## Backend:
###### tastedive web api (for making media queries that return similar artists/titles)
###### django rest API with python (the backend database)
###### socket.io (for chat, was working at one time but was not fully developed)
###### IO from BytesIO (for getting sizes of images before HTML render)
###### python itertools chain (for combining queries in django)

## Frontend:
###### NPM email-validator
###### Fontawesome icons
###### React router (Site mapping)
###### React flux (Communicating across views)
###### React flux-dash from 4GeeksAcademy (For providing the event-actions-store-subscription model)
###### NPM React masonry component
###### NPM react-youtube (The youtube iframe for the youtube player)
###### CSS Flip by David Walsh (provides the animation for the book widget)
###### NPM rc-table (Used for rendering the table data for recommended media and recommended friends)

## How to use the website
The website is not completely fleshed out and it is being used as a demo. Right now there are 5 test profiles: testuser1, testuser2, testuser3, testuser4, and testuser5. There is no authentication so they do not require a password. The main view is what is called the feed. Users that are friends can see widgets from each other's profile, but only after they become friends (which is why not all the widgets are showing). The widgets on the feed are single widgets in a line. The profile view has masonry. There are 3 kinds of widgets: a book, a video player, and a text box. To add a book, you must find the URL of 2 images and they must be valid urls ending in either .jpg, .gif, or .png. The author must by typed correctly. If it is not, it will not allow you to post, because tastedive uses the author and it would pollute the database if not typed correctly. To add a youtube player, add each video with the url of the youtube video, the author or artist for the media, and the title of the media. After you have added the videos, click submit. The text box is straight-forward except the URL of the article/website must be valid. 


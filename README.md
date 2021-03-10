README File


# Project Name
MBgallery

## Description

Photographers Page with purchase option.
 
## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault. 
**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
**homepage** - (Link-Button -> Portfolio/Album)   
**Navbar** for user (Log-In, Sign-up, Log-Out, Edit/Delete; Albums)
**Footer** for impressum and copyright
**signup** - Sign up Form (-> Album)
**login** - Log-in Form(with Link-Button -> Sign up).
**user** (edit (onSubmit-Button for update)/onClick for delete)
**Album** - Album(all images) with dropdown for filter (genre) (->ImageDetail).
**ImageDetail** (onClick-Button for buy -> purchase overview)
**upload**-  picture upload with cloudinary ( -> Album)
**purchase**- list of images to buy (Link-Button -> Album) 
**purchase overview**- list all purchases (Link-Button -> Album) 


## Backlog
pay by stripe


## ROUTES:

Server-side
auth.routes.jsx
router.post('/signup')
router.post('/signin')
router.post('/logout')
router.post('/delete')
router.get('/user')
router.get('/albums')
router.get('/image/{image_id}')
router.post('/image/')
router.post(purchase)/purchase/{image_id}
router.get(purchase)/purchase/{buyer_id}


Client-side
	Sites:
1. Home (‘/‘)
2. Signup (‘/signup ‘)
3. Signin (‘/signin ‘)
5. Album/filtered (dropdown) (‘/album’)
6. Imagedetail (w option for edit/change, delete and buy)  (‘/{image_id} ‘); 
    conditional rendering for LoggedInUser
7. Uploadform (cloudinary)  (‘/upload ‘); conditional rendering for LoggedUser
8. purchase  (‘/purchase ‘); conditional rendering for LoggedInUser
9. purchase overview  (‘/purchase ‘);  conditional rendering for LoggedInUser


Server-Side

Components 
MyNav.jsx
MyFooter.jsx
UploadForm.jsx
Pages
LogIn.jsx
SignUp.jsx
User.jsx
MyAlbum.jsx
ImageDetail.jsx
MyPurchase.jsx
AllPurchases.jsx



## Models

User-Model
Image-Model
Purchase-Model


## Links

### Kanban-Board



### Git
The url to your repository and to your deployed project
[Repository Link]
(Server: https://github.com/MattBrwn/MBgallery-server)
(Client: https://github.com/MattBrwn/MBgallery-client)
[Deploy Link](https://https://mb-gallery.herokuapp.com/)

### Slides

The url to your presentation slides
[Slides Link](https://docs.google.com/presentation/d/1AfdVpL4yeZUfp5rkvLb3UGdeSB9IPygEFrvSQWTa460/edit?usp=sharing)
[wireframes] (https://docs.google.com/drawings/d/1ZySTqDrEnofdon66RXx0IXs5A9igZ0Y0i4nuchIRRd4/edit?usp=sharing)

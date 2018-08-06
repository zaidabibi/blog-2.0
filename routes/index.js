var express = require('express');
var router = express.Router();
var request = require('request');


var Blogs = require('../db.json');
///////////////////////////////////////////HOMEPAGE///////////////////////////////////////
/* GET home page. */
router.get('/', function(req, res, next) {
//res.render('index', { title: 'Home', blogs: myBlogs.Blogs});

 request.get({
     url: 'http://localhost:8000/posts',
     json: true
 }, function(error, response, body){
     //what to send when function has finished
     res.render('index', { title: 'Home', posts: body});
 });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
//res.render('index', { title: 'Home', blogs: myBlogs.Blogs});

 request.get({
     url: 'http://localhost:8000/users',
     json: true
 }, function(error, response, body){
     //what to send when function has finished
     res.render('login', { title: 'Home', users: body});
 });
});
///////////////////////////////////////////ARCHIVEPAGE///////////////////////////////////////
//GET blogs page
router.get('/posts', function(req, res, next) {
   request.get({
     url: 'http://localhost:8000/posts',
     json: true
}, function(error, response, body){
       res.render('posts', { title: 'Posts', posts: body });
 });

});
/////////////////////////////////////////////////////////////////////
//GET login page
router.get('/login', function(req, res, next) {
   request.get({
     url: 'http://localhost:8000/posts',
     json: true
}, function(error, response, body){
       res.render('login', { title: 'Posts', posts: body });
 });

});

///////////////////////////////////////////CONTACTPAGE///////////////////////////////////////
//GET contact page
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});
//GET contact page
router.get('/contact/submit', function(req, res, next) {
  res.render('index', { title: 'Contact' });
});

///////////////////////////////////////////EDIT DATA///////////////////////////////////////
//GET edit page
//router.get('/edit/:id', function(req, res, next) {
//
//       let urlPath = req.path;
//
//        if(urlPath.length == 7){
//           let postVal = urlPath.slice(-1);
//           res.render('edit', { title: 'Edit Blog', blogs: Blogs.Blogs[postVal -1] });
//        }
//
//        if(urlPath.length = 8){
//           let postVal = urlPath.slice(-2);
//           res.render('edit', { title: 'Edit Blog', blogs: Blogs.Blogs[postVal -1] });
//        }
//
//});

router.get('/edit/:id', function(req, res, next) {
    //make a post request to our database
    request({
    url: "http://localhost:8000/posts/" + req.params.id,
    method: "GET",
    }, function(error, response, body) {
        console.log(JSON.parse(body));
        res.render('edit', { title: 'Edit Blog',posts: JSON.parse(body)});
    });
})

///////////////////////////////////////////DELETE DATA///////////////////////////////////////
/* GET delete BLOG-ID.*/
router.get('/delete/:id', function(req, res, next) {
  //make a post request to our database
  request({
    url: "http://localhost:8000/posts/"  + req.params.id,
    method: "DELETE",
    }, function(error, response, body) {

        res.redirect('/');
    });
});


///////////////////////////////////////////VIEW DATA///////////////////////////////////////
//GET view page

//router.get('/view/:id', function(req, res, next) {
//
//
//
//       let urlPath = req.path;
//
//
//        if(urlPath.length == 7){
//           let postVal = urlPath.slice(-1);
//           res.render('view', { title: 'Read More', blogs: Blogs.Blogs + req.params.id, });
//        }
//
//        if(urlPath.length = 8){
//           let postVal = urlPath.slice(-2);
//           res.render('view', { title: 'Read More', blogs: Blogs.Blogs[postVal -1] });
//        }
//
//
//});



router.get('/view/:id', function(req, res, next) {
    //make a post request to our database
    request({
    url: "http://localhost:8000/posts/" + req.params.id,
    method: "GET",
    }, function(error, response, body) {
        res.render('view', { title: 'Read More',posts: JSON.parse(body)});
    });
})


///////////////////////////////////////////UPDATE DATA///////////////////////////////////////


router.post('/update/:id', function(req, res, next) {

    request({
    url: "http://localhost:8000/posts/"+ req.params.id,
    method: "PUT",
    form: {
        "title": req.body.title,
        "author": req.body.author,
        "date": req.body.date,
        "image": req.body.image,
        "content": req.body.content
    }
    }, function(error, response, body) {
        res.redirect('/');

    });
})


///////////////////////////////////////////POST DATA///////////////////////////////////////
//GET new page
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Create New Blog' });
});

//Post new page
router.post('/new', function(req, res , next) {

//create a variable a post
var d = new Date();
console.log(d);
 let obj = {
  "title": req.body.title,
  "author": req.body.author,
  "date": req.body.date,
  "image": req.body.image,
  "content": req.body.content,
  "time": d,
}

 //write logic to save this data

 request.post({
     url: 'http://localhost:8000/posts',
     body: obj,
     json: true
 }, function(error, response, body){
//what to send when function has finished
     res.redirect('/');
 });


    });

module.exports = router;

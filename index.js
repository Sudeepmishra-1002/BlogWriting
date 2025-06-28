const express = require("express");
const app = express();
const port = 3030;
const path = require("path");
const { v4: uuidv4 } = require('uuid');// random id generate krne ke lia 
// uuidv4(); //
const methodOverride = require("method-override");



//ye sirf cache clear krne ke lia 

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});


// Taaki website form-data samajh paaye
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// EJS set karna as view engine
app.set("view engine", "ejs");

// ✅ Correct: views folder ka path set
app.set("views", path.join(__dirname, "views"));
// app.set("views", path.json(__dirname, "views"));

 let posts=[
    {   
        // id:"1a", // to get one post
        id:uuidv4(),//for random id 
        username:"harry_potter",
        topic_name:"topic",
        content:"how beautiful are the stars",
    },
    {   
        // id:"2b",
        id:uuidv4(),
        username:"hemoine_granger",
        topic_name:"curious",
        content:"how the star were made?",
    },
    {   
        // id:"3c",
        id:uuidv4(),
        username:"Ron_weasly",
        topic_name:"food",
        content:"can we eat this delicious food before the end of this night",
    },
 ];

// ✅ Correct: serve static files (like CSS) from public folder
app.use(express.static(path.join(__dirname, "public")));
// app.set(express.static("views", path.json(__dirname, "views")));

app.get("/posts", (req, res) => {
    res.render("index.ejs",{ posts }); // GET request test
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs"); // GET request test for new post 
});
app.post("/posts",(req,res)=>{
    let { username,topic_name,content}=req.body;
    let id=uuidv4();
    // console.log(req.body);
    posts.push({id, username,topic_name,content});
    // res.send("post request working");    // new post(content) ko post krne ke lia 
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let post=posts.find((p)=>id===p.id);//  isse hme terminal mai post show hoga
    // console.log(post);
    // res.send("request working");
    res.render("show.ejs",{post});
});
// Optional: if you want posts page
// const posts = [
//     { id: 1, title: "Binary Tree", content: "Use DFS for traversal" },
//     { id: 2, title: "DP on Strings", content: "Try memoization" },
// ];

// app.get("/posts", (req, res) => {
//     res.render("index", { posts });
// });

// app.get("/posts/:id", (req, res) => {
//     const post = posts.find(p => p.id == req.params.id);
//     if (post) {
//         res.render("show", { post });
//     } else {
//         res.send("Post not found");
//     }
// });

app.patch("/posts/:id",(req,res)=>{
    let { id }=req.params;
    let newContent=req.body.content;//content terminal mai print krane ke lia 
    // console.log(id);
    // console.log(newContent);
    let post=posts.find((p)=>id===p.id);//  isse post find krenge 
    post.content=newContent;
    console.log(post);
    // res.send("patch request working");
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{  //post edit krne ke lia 
    let {id }=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs");
})




// Signup GET page
app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

// Signup POST (basic redirect for now)
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    console.log("New signup:", username, password); // optional: save to array/file/db
    res.redirect("/posts"); // redirect to home after signup
});






app.listen(port, () => {
    console.log("listening to port : 3030");
});

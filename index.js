const express = require("express");
const app = express();

const path = require("path");


const {v4: uuidv4} = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride('_method'));


// req.body diye kiso send korle ta server read korate
app.use(express.urlencoded( { extended: true } ) );

app.set("view engine" , "ejs");

app.set("views",  path.join(__dirname,"views") );

// public folder access korte
app.use( express.static(path.join(__dirname,"public") ) );
   

// body

let posts = [
    // {
    //     id: uuidv4() ,
    //     username: "Arib",
    //     content: "I love coding"
    // },

    // {
    //      id: uuidv4(),
    //     username: "Fagun",
    //     content: "I love eating"
    // },

    // {
    //      id: uuidv4(),
    //     username: "Towhid",
    //     content: "Keep work hard"
    // }


];


app.get("/posts", (req,res)=>
{
   
   res.render("index.ejs",{ posts }); 

}
);



app.get("/posts/new", (req, res) =>
{
    res.render("new.ejs");
}
);


app.post("/posts", (req,res)=>
{
    let {username, content } = req.body;

    let id = uuidv4();

    posts.push( { id, username, content }  );

   res.redirect("/posts");
}
);



app.get("/posts/:id", (req,res)=>
{
   
   let{id} = req.params;

   let post = posts.find(  (p) => id === p.id  );
    res.render("show.ejs",{post});
}
);


// for updated message ...but eta support kore na
// that`s why we need method-override
app.patch("/posts/:id", (req,res)=>
{
    let{id} = req.params;

    let newContent = req.body.content;

     let post = posts.find(  (p) => id === p.id  );

     post.content = newContent;

     res.redirect("/posts");

}
);

// for edit message --> after edit will call patch
app.get("/posts/:id/edit",(req, res) =>

    {
        let{id} = req.params;

   let post = posts.find(  (p) => id === p.id  );

   res.render("edit.ejs", {post});

    }
)


// delete message
app.delete("/posts/:id" , (req, res) =>
{
    
        let{id} = req.params;

    posts = posts.filter(  (p) => id !== p.id  );

   res.redirect("/posts");

}
);



const port = 8080;
app.listen(port, ()=>
{
    console.log(`Server is running port : ${port}`);
}

);
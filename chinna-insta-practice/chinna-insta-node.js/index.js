let express = require("express")
let cors = require("cors")
let formidble = require("express-formidable")
let db_con = require('./db_con');
let nodemailer = require("nodemailer")










//use place

//use express
let app = express();
//use cors
app.use(cors());

//use formidble 
app.use(formidble())
//db_con






//port 
app.listen(4008)

app.post("/saveuser", async (req, res) => {
    const { UserName, Email, Password } = req.fields;
    try {
        let data = await db_con.saveotpregisterData(UserName, Email, Password);
        console.log("save user data api called...");
        if (data.message) {
            res.status(400).json({ message: data.message });
        } else {
            res.status(200).json({ message: "User registered successfully" });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});


//save register
app.post("/Saveregister", async (req, res) => {
    let data = await db_con.SaveregisterData(req.fields.UserName, req.fields.Email, req.fields.Password)
    res.redirect("http://localhost:3000/");
    res.end()
})
//get api

app.get("/getRegister", async (req, res) => {
    let data = await db_con.instadataData();
    res.write(JSON.stringify(data));
    res.end()
})


//save profile image

app.post("/saveprofileimage", async (req, res) => {
    let data = await db_con.Save_Profile_imageData(req.fields.user_id, req.fields.user_image)
    res.end();
})

app.get("/getprofileimage", async (req, res) => {
    let data = await db_con.Get_profile_imageData();
    res.write(JSON.stringify(data));
    res.end();
})

//other profile
//save
app.post("/saveotherprofile", async (req, res) => {
    let data = await db_con.SaveOtherprofileData(req.fields.UserName, req.fields.image)
    res.end();
})

//get
app.get("/getOtherprofile", async (req, res) => {
    let data = await db_con.getotherProfileData();
    res.write(JSON.stringify(data));
    res.end();
})

//single profile

app.get("/singleprofile/:id", async (req, res) => {
    let data = await db_con.singleProfileData(req.params.id);
    res.write(JSON.stringify(data))
    res.end();
})

//single username 
app.get("/singleusername/:id", async (req, res) => {
    let data = await db_con.singleusernameData(req.params.id);
    res.write(JSON.stringify(data))
    res.end();
})

//singlestory
app.get("/singlestory/:user_id", async (req, res) => {
    let data = await db_con.singlestoryData(req.params.user_id);
    res.write(JSON.stringify(data))
    res.end();
})
//single post
app.get("/singlepost/:user_id", async (req, res) => {
    let data = await db_con.singlepostData(req.params.user_id);
    res.write(JSON.stringify(data))
    res.end();
})



//view

app.get("/view", async (req, res) => {
    let data = await db_con.view_homeDara();
    res.write(JSON.stringify(data));
    res.end()
})



// app.get("/viewhome " , async (req, res) => {
//     let data = await db_con.view_homeDara()
//     res.write(JSON.stringify(data))
//     res.end()
// })
//save post
//save
app.post("/savepost", async (req, res) => {
    let data = await db_con.SavePostdata(req.fields.add_post)
    res.end()

})

//get
app.get("/Getpost", async (req, res) => {
    let data = await db_con.GetPostData();
    res.write(JSON.stringify(data));
    res.end();
})


//save Story
//save
app.post("/SaveStory", async (req, res) => {
    let data = await db_con.SaveStoryData(req.fields.Add_story, req.fields.user_id)
    res.end()

})

//get
app.get("/GetStory", async (req, res) => {
    let data = await db_con.GetStoryData();
    res.write(JSON.stringify(data));
    res.end();
})

//search 

app.post("/SearchName", async (req, res) => {
    let data = await db_con.Searchdata(req.fields.UserName);
    res.write(JSON.stringify(data))
    res.end();
})

app.post("/EdituserName", async (req, res) => {
    let data = await db_con.EditusernameData(req.fields.UserName, req.fields.id)
    res.redirect("http://localhost:3000/myprofile")
    res.end()
})

app.post("/Editstory", async (req, res) => {
    let data = await db_con.editStoryData(req.fields.Add_story, req.fields.id)
    res.redirect("http://localhost:3000/myprofile")
    res.end()
})

//update story

// app.post("/updatestory", async (req, res) => {
//     let data = await db_con.storyupdateimageData(req.fields.Add_story, req.fields.user_id)
//     res.write(JSON.stringify(data))
//     res.end()
// })

app.post("/updatestory", async (req, res) => {
    const { user_id, Add_story } = req.fields
    let data = await db_con.storyupdateimageData(user_id, Add_story);
    res.end(JSON.stringify(data));
})

app.get("/getupdatestory/:user_id", async (req, res) => {
    let data = await db_con.GetupdatestoryData(req.params.user_id);
    res.write(JSON.stringify(data));
    res.end()
})


//post
//save
app.post("/save_post", async (req, res) => {
    const { user_id, caption, add_post } = req.fields
    let data = await db_con.save_postData(user_id, caption, add_post);
    res.end(JSON.stringify(data));
})

//get post 
app.get("/getupdatepost/:user_id", async (req, res) => {
    let data = await db_con.GetupdatepostData(req.params.user_id);
    res.write(JSON.stringify(data));
    res.end()
})



//update pic
//save
app.post("/updateprofile", async (req, res) => {
    const { user_id, user_image } = req.fields
    let data = await db_con.updateprofileData(user_id, user_image);

    res.end(JSON.stringify(data));

})

//get

app.get("/getupdatepic/:user_id", async (req, res) => {
    let data = await db_con.GetupdatepicData(req.params.user_id);
    res.write(JSON.stringify(data));
    res.end()
})

//sent otp
app.post("/sentotp", async (req, res) => {
    const { Email } = req.fields; // Use req.body to access the posted data
    try {
        let data = await db_con.sentotpData(Email);
        console.log("sent otp called..");
        res.json(data); // Use res.json to send the JSON response
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

//save otp
app.post("/saveotp", async (req, res) => {
    const { Email, otp, Password } = req.fields;
    console.log("save otp", Email, otp, Password);
    let data = await db_con.saveotpData(Email, otp, Password);
    console.log("post otp called...")
    res.json(data);
})

app.post('/check-email', async (req, res) => {
    try {
        const { Email } = req.fields;
        const emailExists = await db_con.checkEmailExistsData(Email);
        if (emailExists) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        res.status(200).json({ message: 'Email is available' });
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/top" , async (req, res) => {
    let data = await db_con.topData();
    res.write(JSON.stringify(data))
    res.end ()
})


















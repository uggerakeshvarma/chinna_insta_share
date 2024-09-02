let mysql = require("mysql2")

let Nodemailer = require("nodemailer")

//create connection 
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chinnaa@1432",
    database: "chinnainsta"
});

const transporter = Nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sucharithsrakesh143@gmail.com",
        pass: "Chinnaa@1432"
    }
})


//register table 
async function saveotpregister(UserName, Email, Password) {
    startconnection();
    try {
        // Check if user already exists
        let [existinguser] = await con.promise().query(`select * from register where Email LIKE ?`, [Email]);

        if (existinguser.length > 0) {
            return { message: "User with this email already exists" };
        } else {
            // Insert new register
            let [insertedData] = await con.promise().query(`insert into register (UserName, Email, Password) values (?, ?, ?)`, [UserName, Email, Password]);
            return insertedData;
        }
    } catch (error) {
        console.error("Error occurred:", error);
        throw error;
    }
}




function startconnection() {
    con.connect((err) => {
        if (err) throw err;
        console.log("connected")
    })
}

async function Saveregister(UserName, Email, Password) {
    startconnection();
    let data = await con.promise().query(`insert into register(UserName,Email,Password) values ('${UserName}','${Email}','${Password}'   ) `)
    return data[0]
}


async function instadata() {
    startconnection();
    let data = await con.promise().query(`select * from register;`)
    return data[0];
}

// save pRofile image

async function Save_Profile_image(user_id, user_image) {
    startconnection();
    let data = await con.promise().query(`insert into profile_image (user_id,user_image) values( ${user_id} ,'${user_image}'  )  `)
    return data[0]

}

//save pRofile image

async function Get_profile_image() {
    startconnection();
    let data = await con.promise().query(`SELECT * FROM profile_image;`)
    return data[0]
}

//other image
//save 
async function SaveOtherprofile(UserName, image) {
    startconnection();
    let data = await con.promise().query(`insert into other_profiles (UserName,image) values ('${UserName}','${image}'  )`)
    return data[0]
}
//get 
async function getotherProfile() {
    startconnection();
    let data = await con.promise().query(`SELECT * FROM other_profiles;`)
    return data[0]

}

//single profile 

async function singleProfile(id) {
    startconnection();
    let data = await con.promise().query(`select * from profile_image where  id='${id}' `)
    return data[0];
}

//single username
async function singleusername(id) {
    startconnection();
    let data = await con.promise().query(`select * from register where  id='${id}' `)
    return data[0];
}
// single story
async function singlestory(user_id) {
    startconnection();
    let data = await con.promise().query(`select * from story where  user_id='${user_id}' `)
    return data[0];
}

//single post
async function singlepost(user_id) {
    startconnection();
    let data = await con.promise().query(`select * from add_post where  user_id='${user_id}' `)
    return data[0];
}





// add post 
//save

async function SavePost(add_post) {
    startconnection();
    let data = await con.promise().query(`insert into add_post (add_post) values ('${add_post}'  )`)
    return data[0]
}
//get
async function GetPost() {
    startconnection();
    let data = await con.promise().query(`SELECT * FROM add_post;`)
    return data[0]

}
//Story
//save
async function SaveStory(Add_story, user_id) {
    startconnection();
    let data = await con.promise().query(`insert into story (Add_story,user_id) values ('${Add_story}', ${user_id}  )`)
    return data[0]
}
//get
async function GetStory() {
    startconnection();
    let data = await con.promise().query(`SELECT * FROM story;`)
    return data[0]

}

//search onether profile

async function Search(UserName) {
    startconnection();
    let data = await con.promise().query(`SELECT 
    register.id as user_id, 
    register.UserName, 
    profile_image.user_image,
    add_post.id as add_post_id, 
    add_post.caption, 
    add_post.add_post
FROM register
LEFT JOIN profile_image ON register.id = profile_image.user_id
LEFT JOIN add_post ON register.id = add_post.user_id
WHERE register.UserName LIKE '%${UserName}%';
`)
    return data[0];
}

//edit username
async function Editusername(UserName, id) {
    startconnection();
    let data = await con.promise().query(`update register  set UserName='${UserName}' where id="${id}"  `)
    return data[0]

}

async function editStory(Add_story, id) {
    startconnection();
    let data = await con.promise().query(`update add_story  set Add_story='${Add_story}' where id=${id}  `)
    return data[0]

}

//update story image
//save
async function storyupdateimage(user_id, Add_story) {
    startconnection();
    let data = await con.promise().query(`insert into story(user_id,Add_story)values(${user_id}, "${Add_story}")`)
    return data[0]
}

//get

async function Getupdatestory(user_id) {
    startconnection();
    let data = await con.promise().query(`SELECT story.Add_story 
FROM register 
JOIN story ON register.id = story.user_id 
WHERE register.id = ${user_id}`)
    return data[0]
}



//update profile 

async function updateprofile(user_id, user_image) {
    startconnection();
    let data = await con.promise().query(`CALL Update_pic(${user_id}, "${user_image}");`)
    return data[0]
}

//get
async function Getupdatepic(user_id) {
    startconnection();
    let data = await con.promise().query(`select profile_image.user_image from register join  profile_image on register.id= profile_image.user_id  where register.id= ${user_id} `)
    return data[0]
}

//view
async function view_home() {
    startconnection();
    let data = await con.promise().query(`  SELECT 
    register.id AS user_id, 
    register.UserName,
    profile_image.user_image,
    add_post.add_post, 
    add_post.caption
FROM 
    register
LEFT JOIN 
    profile_image ON register.id = profile_image.user_id
LEFT JOIN 
    add_post ON register.id = add_post.user_id;`)
    return data[0]
}

//post

//save 
async function save_post(user_id, caption, add_post) {
    startconnection()
    let data = await con.promise().query(`INSERT INTO add_post (user_id, caption, add_post) VALUES
 (${user_id} , "${caption}", "${add_post}") `)
    return data[0]
}
//get

async function Getupdatepost(user_id) {
    startconnection();
    let data = await con.promise().query(`SELECT add_post.add_post 
FROM register 
JOIN add_post ON register.id = add_post.user_id 
WHERE register.id  = ${user_id}`)
    return data[0]
}

//sent otp
async function sentotp(Email) {
    startconnection();


    let data = await con.promise().query(`SELECT * FROM register WHERE Email = '${Email}'`);

    try {
        if (data) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            console.log("otp", otp)
            let data = await con.promise().query(`call otp_procedure('${Email}' , '${otp}')`)

            const mailOptions = {
                from: 'sucharithsrakesh143@gmail.com',
                to: Email,
                subject: 'Your OTP Code for Password Reset',
                text: `Your One Time Password:- ${otp}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                } else {
                    console.log("Email sent", info.response);
                }
            })
            return data[0]

        }
    }
    catch (error) {
        console.log("last error ", error)
    }
}



//save otp
// Save OTP
async function saveotp(Email, otp, Password) {
    startconnection(); // Ensure this function establishes a proper connection
    try {
        const [rows] = await con.promise().query(`SELECT COUNT(*) AS countotp FROM otp WHERE Email = ? AND otp = ?`, [Email, otp]);
        console.log("data", rows);
        if (rows[0].countotp > 0) {
            await con.promise().query(`UPDATE register SET Password = ? WHERE Email = ?`, [Password, Email]);
            return { success: true, message: "Password updated successfully" };
        } else {
            return { success: false, message: "Invalid OTP" };
        }
    } catch (error) {
        console.error("Error in database operation: ", error);
        throw error;
    }
}


// Function to check if email exists
async function checkEmailExists(Email) {
    const query = 'SELECT COUNT(*) AS count FROM register WHERE email = ?';
    const [rows] = await db.execute(query, [Email]);
    return rows[0].count > 0;
}




// Function to check if email exists
async function checkEmailExistsss(Email) {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE Email = ?';
    const [rows] = await db.execute(query, [Email]);
    return rows[0].count > 0;
}

// Function to save registration data
async function saveRegisterData(username, email, password) {
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    await db.execute(query, [username, email, password]);
    return { message: 'Registration successful' };
}

//top

async function top() {
    startconnection()
    let data = await con.promise().query(`SELECT 
    register.id, 
    register.UserName, 
    profile_image.user_image
FROM 
    register
JOIN 
    profile_image ON register.id = profile_image.user_id;`)
    return data[0]
}








module.exports = {

    //register//
    //save register
    SaveregisterData: async (UserName, Email, Password) => Saveregister(UserName, Email, Password),
    //getregister
    instadataData: async () => instadata(),

    //view

    view_homeDara: async () => view_home(),


    //user image//
    //save profile image
    Save_Profile_imageData: async (user_id, user_image) => Save_Profile_image(user_id, user_image),
    //profile image
    Get_profile_imageData: async () => Get_profile_image(),



    //other profile
    //save
    SaveOtherprofileData: async (UserName, image) => SaveOtherprofile(UserName, image),
    //get
    getotherProfileData: async () => getotherProfile(),



    //single
    //single profile 
    singleProfileData: async (id) => singleProfile(id),
    //single username
    singleusernameData: async (id) => singleusername(id),
    //single username
    singlestoryData: async (user_id) => singlestory(user_id),
    //singlepost
    singlepostData: async (user_id) => singlepost(user_id),

    //Addpost
    //save
    SavePostdata: async (add_post) => SavePost(add_post),
    //get
    GetPostData: async () => GetPost(),

    //id post
    //save post
    save_postData: async (user_id, caption, add_post) => save_post(user_id, caption, add_post),
    //get post
    GetupdatepostData: async (user_id) => Getupdatepost(user_id),


    //Addstory
    //save
    SaveStoryData: async (user_id, add_story) => SaveStory(user_id, add_story),
    //get
    GetStoryData: async () => GetStory(),

    //saerch
    Searchdata: async (UserName) => Search(UserName),
    //edit UserName
    EditusernameData: async (UserName, id) => Editusername(UserName, id),
    //edit Story
    editStoryData: async (Add_story, id) => editStory(Add_story, id),


    //update srory
    storyupdateimageData: async (user_id, Add_story) => storyupdateimage(user_id, Add_story),
    //get
    GetupdatestoryData: async (user_id) => Getupdatestory(user_id),

    //update profile 
    //save
    updateprofileData: async (user_id, user_image) => updateprofile(user_id, user_image),
    //get 
    GetupdatepicData: async (user_id) => Getupdatepic(user_id),

    //save otp

    saveotpregisterData: async (UserName, Email, Password) => saveotpregister(UserName, Email, Password),
    //sent otp
    sentotpData: async (Email) => sentotp(Email),
    //saveotp
    saveotpData: async (Email, otp, Password) => saveotp(Email, otp, Password),

    // checkmail
    checkEmailExistsData: async (Email) => checkEmailExists(Email),


    //check try
    checkEmailExistsDaa: async (Email) => checkEmailExistsss(Email),
    saveRegisterDataDa: async (username, email, password) => saveRegisterData(username, email, password),

    topData: async() => top()

}

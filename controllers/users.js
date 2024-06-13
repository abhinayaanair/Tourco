const User=require("../models/user.js")


module.exports.renderSignupForm=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.signup=async (req, res, next) => {
    try {
        console.log("Registration route hit"); // Add this log to see if the route is hit
        const { email, username, password } = req.body;
        const newUser = new User({ email, username }); // Create a new instance of the User model
        const registeredUser = await User.register(newUser, password); // Register the user with Passport
        console.log("User registered:", registeredUser); // Add this log to see if the user is registered successfully
        req.login(registeredUser, err => { // Log in the registered user
            if (err) return next(err);
            req.flash('success', 'Welcome to Wanderlust!');
            const redirectUrl = res.locals.redirectUrl || '/listings';
            delete res.locals.redirectUrl;
            res.redirect(redirectUrl);
        });
    } catch (e) {
        console.error("Registration error:", e); // Add this log to see any registration errors
        req.flash('error', e.message);
        res.redirect('/signup');
    }
}

module.exports.renderLoginForm=(req,res)=>{
    
    res.render("./users/login.ejs")
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to Tourco! ");
    let redirectUrl=res.locals.redirectUrl||"/listings"; 
    res.redirect(redirectUrl);
 
}


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        };
        req.flash("success","Successfully logged out");
        res.redirect("/listings")
    })
}
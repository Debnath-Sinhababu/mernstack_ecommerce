const sendToken = async(user, statusCode, res) => {
    const token = await user.getJWTToken();
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      
      ),
      sameSite: 'none', 
      secure: true,
      httpOnly: false,
    };
    console.log(token)
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };
  export default sendToken
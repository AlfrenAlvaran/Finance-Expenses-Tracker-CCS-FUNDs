const logoutAuth = async (req, res) => {
    console.log(req.body);
    
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    })

    return res.status(200).json({
        error: false,
        message: "Logged out successfully"
    })
}


export default logoutAuth;
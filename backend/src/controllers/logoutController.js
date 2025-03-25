const logoutController = {};

logoutController.logout = async (req,res) => {

    res.clearCookie("authToken")
    return res.json({message: "se cerro la sesion"});
};

export default logoutController;
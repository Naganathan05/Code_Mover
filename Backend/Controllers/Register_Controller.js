const Register_Module = require('../Modules/Register_Module');

const Register_Controller = async(req, res) => {
    const { User_Name, Password, Access_Token, Email_ID } = req.body;
    const Register_response = await Register_Module(User_Name, Password, Access_Token, Email_ID);
    res.status(Register_response.responseCode).json({message: Register_response.responseBody});
}

module.exports = Register_Controller;
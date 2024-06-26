const AWS = require('aws-sdk');
const crypto = require('crypto');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const docClient = new AWS.DynamoDB.DocumentClient();

let responseCode = 200;
let responseBody = "";

const Update_Profile = {
    profile : async(User_Name, Email, Access_Token) => {
        const params = {
            TableName: "Auth",
            Key: {
                "User_Name": User_Name
            },
            UpdateExpression: "set Email = :x, Access_Token = :y",
            ExpressionAttributeValues: {
                ":x": Email,
                ":y": Access_Token
            }    
        };
    
        docClient.update(params, function(err, data) {
            if(err){
                responseCode = 100;
                responseBody = "Error in Updating Profile";
            }
            else{
                responseBody = "Successfully Updated Profile";
            }
        });
    
        const response = {
            responseCode,
            responseBody
        };
    
        return response;
    },

    password : async(User_Name, Password) => {
        const hashedPassword = crypto.createHash('sha256').update(Password).digest('hex');
        const params = {
            TableName: "Auth",
            Key: {
                "User_Name": User_Name
            },
            UpdateExpression: "set Password = :x",
            ExpressionAttributeValues: {
                ":x": hashedPassword
            }    
        };
    
        docClient.update(params, function(err, data) {
            if(err){
                responseCode = 100;
                responseBody = "Error in Updating Password";
            }
            else{
                responseBody = "Successfully Updated Password";
            }
        });
    
        const response = {
            responseCode,
            responseBody
        };
    
        return response;
    },
}

module.exports = Update_Profile;
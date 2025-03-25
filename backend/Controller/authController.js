const User = require('../Model/UserSchema');
const Supplier = require('../Model/SupplireSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretkey = '32wrdc34ferc5tfvc4erfd3e4r';
const {SendMail} = require('../Utility/Nodemailer');
const moment = require('moment');



exports.usersignup = async (req, res) => {
    try {
        const { name, email, password, phone,role } = req.body;
        if (!name && !email && !password && !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }
        else{
            if(role ==='user'){
                const user = await User.findOne({ email });
                if (user) {
                    return res.status(400).json({ message: "User already exists" });
                }
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const newUser = new User({
                    name,
                    email,
                    password:hashPassword,
                    phone,
                    role: 'user'
                });
                await newUser.save();
                return res.status(201).json({message: 'User registered successfully'});
            }
            else if(role === 'supplier'){

                const supplirecheack = await User.findOne({ email });
                if (supplirecheack) {
                    return res.status(400).json({ message: "Supplire already exists" });
                }
                else{
                    const { bussiness,  gst, category, payment, location } = req.body;
                    if (!(bussiness  && gst && category && payment && location)) {
                        return res.status(400).json({ message: "All fields are required" });
                    }
                    else{
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        
                        const newSupplier = new Supplier({
                            bussiness,
                            gst,
                            category,
                            payment,
                            location,
                            email // Ensure the email field is set
                        });
                        await newSupplier.save();
                        const newUser = new User({
                            name,
                            email,
                            password:hashPassword,
                            phone,
                            role: 'supplier',
                            supplier_id: newSupplier._id
                        });
                        await newUser.save();

                        
                        return res.status(201).json({message: 'Supplier registered successfully'});
                    }

                }

            }
        }
    }
    catch (err) {
        return res.status(500).json({ msg: err.message });
    }
    
};
// exports.suppliresignup = async (req, res) => {
//     try {
//         const { name,  password, phone , bussiness, bemail ,gst ,category,payment,location} = req.body;
//         if (!(name  && password && phone && bussiness && bemail &&  gst && category && payment && location)) {
//             return res.status(400).json({ msg: "All fields are required" });
//         }
//         // const supp = await Supplier.findOne({ bemail });
//         // if (supp) {
//         //     return res.status(400).json({ msg: "Supplire already exists" });
//         // }
//         // const salt = await bcrypt.genSalt(10);
//         // const hashPassword = await bcrypt.hash(password, salt);
//         const newSupplier = new Supplier({
//             bussiness,
//             gst,
//             category,
//             payment,
//             location,
//         });
//         await newSupplier.save();
//         const userexist = await User.findOne({email: bemail});
//         if(!userexist) {
//         const createUser = new User({
//             name: bussiness,
//             email: bemail,
//             password: hashPassword,
//             phone: phone,
//             supplier_id: newSupplier._id,
//             role: 'supplier'
//         });
//         await createUser.save();
//         }
//         return res.status(201).json({message: 'Supplier registered successfully'});
//         // res.json({ msg: "Register Success" });
//     }
//     catch (err) {
//         return res.status(500).json({ msg: err.message });
//     }
 
// }

exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({email}); 
        if (!user) {
            return res.status(400).json({message: 'Please Create  Account'});
        }
        else{
            if(role !== user.role){
                return res.status(400).json({message: 'You Dont have permission to login as '+role});
            }
            else{
                const name = user.name;
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    return res.status(400).json({ message: 'Invalid password'});
                }
                const token = jwt.sign({_id: user._id},secretkey,{expiresIn: '1d'});

                return res.status(200).json({message:'User login Succesful',token,name,role});

            }
            

            }
        
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}


exports.forgatePassword = async (req, res) => {
    try {
        const email =req.body.formData.email;
        const {otp, newpass,cpass} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({  message: 'User not found' });
        }
        const DBotp = user.otp;
        if(DBotp!=otp){
            return res.status(404).json({message:"Invalid OTP"})
        }
        if(moment()>user.otpTime){
            return res.status(400).json({message:"OTP expire"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newpass, salt);
        await User.updateOne({email}, {password: hashPassword});
        return res.status(200).json({message: 'Password updated'});
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.getOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        // Send OTP to user's email
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpTime = moment().add(5, 'minutes');

        const data = await User.updateOne({email}, {otp, otpTime});
        console.log(data);
        const MailInfo = await SendMail(email,`OTP for password reset`,`Your OTP is ${otp}`)
        console.log('MailInfo', MailInfo);
        
        if (!MailInfo.messageId) {
            return res.status(500).json({message: 'Failed to send OTP'});
        }
        res.status(200).json({message: 'OTP sent'});
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        console.log('....user_email',req.user.email);
        const email = req.user.email;

        const { newPassword , currentPassword} = req.body;
        const user = await userModule.findOne({email});
        if (!user) { return res.status(400).json({message: 'User not found'});
    }
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(400).json({message: 'Invalid password'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const data = await userModule.updateOne({email}, {password: hashPassword }); 
        console.log('data',data);

        res.status(200).json({ message: 'Password updated'});
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}
// $2b$10$iVKmuzcfoSbh5ZLqtdJ0eu5KH6sADO6hgmjm9CtgwB3owgqypwCkS
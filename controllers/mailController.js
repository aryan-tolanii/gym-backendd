import dotenv from "dotenv";
import nodemailer from "nodemailer";
import express from "express";
dotenv.config();
import userModel from "../models/UserModel.js";

const sendMail = async (req, res) => {
    const { name, email, phone, age, gender, membership, goal } = req.body;

    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "You have already sent a request to join"
            });
        }

        const newUser = await userModel.create({
            name,
            email,
            phone,
            membership,
            goal,
            gender,
            age
        });

        // 2. Send Mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "tolaniaryan0@gmail.com",
                pass: "qikwjzzbiqdwbksr",
            },
        });

        const mailOptions = {
            from: email,
            to: "tolaniaryan10@gmail.com",
            subject: "New Gym Membership Request",
            html: `
        <h2>New Join Request Details:</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Age:</b> ${age}</p>
        <p><b>Gender:</b> ${gender}</p>
        <p><b>Membership:</b> ${membership}</p>
        <p><b>Goal:</b> ${goal}</p>
      `,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error while sending mail:", err);
                return res.status(500).json({ message: "Failed to send mail!", error: err.message });
            } else {
                console.log("Mail sent successfully:", info.response);
                return res.status(200).json({ message: "User Saved & Mail Sent Successfully!" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to submit form!" });
    }
};

export { sendMail };
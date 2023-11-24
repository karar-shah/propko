import { User } from "@prisma/client";
import MailJet from "node-mailjet";
import jwt from "./jwt";

const SENDER_EMAIL = process.env.SENDER_EMAIL as string;
const SENDER_NAME = process.env.SENDER_NAME as string;

const BASE_URL = process.env.NEXTAUTH_URL || "http://locahost:3000";

const mailjet = MailJet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_API_SECRET as string
);

const verificationHtml = (url: string) => `
    <h3>Dear User,</h3>
    <p>Thank you for signing up with Mirroor AI.</p>
    <p>We're excited to have you as a part of our community.</p>
    <p>Before you can start using our services, we need to confirm your email address. To do this, simply click the link below:</p>
    <a href="${url}">Verify Email</a>
    <p>If you did not sign up for an account with us, please ignore this email. Rest assured, your information remains secure.</p>
`;

const resetPasswordHtml = (url: string) => `
    <h3>Dear User,</h3>
    <p>We recently received a request to reset your password for your Mirroor AI account.</p>
    <p>Don't worry; we're here to help!</p>
    <p>To reset your password, click on the link below:</p>
    <a href="${url}">Reset Password</a>
    <p>If you didn't initiate this request, please ignore this email.</p>
`;

const sendEmail = async (
  receiverEmail: string,
  subject: string,
  content: string
) => {
  try {
    const { response } = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: SENDER_EMAIL,
              Name: SENDER_NAME,
            },
            To: [
              {
                Email: receiverEmail,
              },
            ],
            Subject: subject,
            //   TextPart: "Greetings from Mailjet!",
            HTMLPart: content,
          },
        ],
      });
    return response.status === 200 || response.status === 201;
  } catch (error) {
    return false;
  }
};

const sendeResetPasswordEmail = async (user: User) => {
  const token = await jwt.generateToken({ userId: user.id });
  if (!token) return false;
  return await sendEmail(
    user.email,
    "Reset Password",
    resetPasswordHtml(
      `${BASE_URL}/api/auth/reset-password/?token=${token}`
    )
  );
};

const sendeVerificationEmail = async (user: User) => {
  const token = await jwt.generateToken({ userId: user.id });
  if (!token) return false;
  return await sendEmail(
    user.email,
    "Email Verification",
    verificationHtml(
      `${BASE_URL}/verify-email/?token=${token}`
    )
  );
};

const mailer = {
  sendeVerificationEmail,
  sendeResetPasswordEmail,
};

export default mailer;

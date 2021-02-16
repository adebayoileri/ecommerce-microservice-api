// import bcrypt from "bcrypt";
// import User from "../../models/user.model";

// const AuthService = ()=> {
//   return {
//     createUser : async (data) => {
//     try {
//       const { name, email, password } = data;

//       // const existingUser = User.find({
//       //   email,
//       // });
//       // if (existingUser) {
//       //   throw new Error("a user already exists with this email address");
//       // }

//       // let salt = await bcrypt.genSalt(10);
//       // let hashedPassword = await bcrypt.hash(password, salt);
//       // const newUser = await User.create({
//       //   name,
//       //   email,
//       //   password: hashedPassword,
//       // });
//       return newUser;
//     } catch (error) {
//       return res.status(400).json({
//         status: "failed",
//         message: error.message,
//       });
//     }
//   }
// }
// }

// export default AuthService;

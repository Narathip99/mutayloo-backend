import User from "../models/user.model";

// register
export const register = async (req: any, res: any) => {
  const { firstname, lastname, email, password, role } = await req.body;

  // check if user exists
  const userExits = await User.findOne({ email });

  if (userExits) {
    return {
      status: 400,
      message: "User already exists",
    };
  }

  // hash password
  const hashedPassword = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 4,
  });

  // create new user
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  return {
    status: 200,
    message: "User registered  successfully",
  };
};

export const login = async (req: any, res: any) => {
  const { email, password } = await req.body;

  // find user
  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: 400,
      message: "User not found",
    };
  }

  // check password
  const isMatch = await Bun.password.verify(password, user.password);
  if (!isMatch) {
    return {
      status: 400,
      message: "Incorrect password",
    };
  }

  return {
    status: 200,
    message: "Login successful",
  };
};

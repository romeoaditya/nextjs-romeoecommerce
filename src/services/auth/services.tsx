import {addData, retriveDataByField} from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    phone: string;
    role?: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) {
  const data = await retriveDataByField("users", "email", userData.email);
  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    await addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

export async function signIn(email: string) {
  const data = await retriveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: {
    id?: string;
    email: string;
    role?: string;
    password?: string;
    image: string;
    created_at?: Date;
    updated_at?: Date;
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callback: Function
) {
  const user = await retriveDataByField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";
    await addData("users", data, (status: boolean, res: any) => {
      data.id = res.path.replace("users/", "");
      if (status) {
        callback(data);
      }
    });
  }
}

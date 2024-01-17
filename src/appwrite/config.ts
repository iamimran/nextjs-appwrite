import config from "@/conf/config";
import { Account, Client, ID } from "appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appwriteClient = new Client();
appwriteClient
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export const appwriteAccount = new Account(appwriteClient);

class AppwriteService {
  // create a new record of user inside appwrite
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await appwriteAccount.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.loginUserAccount({ email, password });
      }
    } catch (error: any) {
      throw error;
    }
  }

  async loginUserAccount({ email, password }: LoginUserAccount) {
    try {
      return await appwriteAccount.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return Boolean(user);
    } catch (error: any) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return appwriteAccount.get();
    } catch (error: any) {
      console.log("GET CURRENT USER: ", error.message);
      throw error;
    }
  }

  async logout() {
    try {
      return await appwriteAccount.deleteSession("current");
    } catch (error: any) {
      console.log("LOGOUT: ", error.message);
      throw error;
    }
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;

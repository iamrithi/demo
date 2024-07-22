import { LoggedInUserRoleStateData, UserRoleStateData } from "@/types";
import { UserData } from "aws-sdk/clients/ec2";
import { create } from "zustand";

var role: "ADMIN" | "MANAGER" | "STAFF" | "USER" | null = null;
export const userRoleStore = create<UserRoleStateData>((set) => ({
  role: role, // Object value with initial properties
  setRole: (role: any) => set({ role }),
  removeRole: (role: any) => set({ role: null }), // Action to update user object
}));
var userData: any | null = null;
export const loggedInUserStore = create<LoggedInUserRoleStateData>((set) => ({
  user: userData,
  removeUser: (user: any) => set({ user: null }), // Action to update user object
  setUser: (user: any) => set({ user }), // Action to update user object
}));

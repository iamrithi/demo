export const checkRole = (data: string[]) => {
  if (data.includes("ADMIN")) return "ADMIN";
  if (data.includes("MANAGER")) return "MANAGER";
  if (data.includes("STAFF")) return "STAFF";
  return "USER";
};

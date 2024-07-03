import { auth } from "@clerk/nextjs/server"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getUserByClerkId } from "./actions/user.actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getClerkCurrentUser() {
  try {
    const { userId } = auth();

    if (!userId) return null;

    const user = await getUserByClerkId(userId);

    return user;
  } catch (error) {
    console.log('Error while trying to get current user:', error);
    throw error
  }
}

export function createUsername(name: string) {
  const username = name.trim().replaceAll(' ', '_')
  // ret
}

export function parseClerkApiError(error: ClerkApiError) {
  if(!error.clerkError) throw error

  const errors = error.errors?.map((error) => error.longMessage).join(', ');

  return errors;
}
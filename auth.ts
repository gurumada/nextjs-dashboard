import NextAuth from 'next-auth';
<<<<<<< HEAD
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 
async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
 
=======
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user');
  }
}

>>>>>>> affe527 (no message)
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
<<<<<<< HEAD
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
 
=======
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
>>>>>>> affe527 (no message)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
<<<<<<< HEAD
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
 
=======
          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
>>>>>>> affe527 (no message)
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
<<<<<<< HEAD
});
=======
});
>>>>>>> affe527 (no message)

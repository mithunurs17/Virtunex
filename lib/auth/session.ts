import { auth0 } from '@/lib/auth0';
import { dbConnect } from '@/lib/db';
import { UserModel, type User } from '@/models/User';
import { StudentProfileModel } from '@/models/StudentProfile';

export async function getOrCreateAppUser(): Promise<User | null> {
  const session = await auth0.getSession();
  if (!session?.user?.sub) return null;
  await dbConnect();
  const claims = session.user as Record<string, unknown>;
  const auth0Id = String(claims.sub);
  const email = String(claims.email || '').trim().toLowerCase();
  if (!email) throw new Error('Authenticated Auth0 user has no email claim');
  const fields = {
    email, emailVerified: Boolean(claims.email_verified), profileImage: String(claims.picture || ''),
    firstName: String(claims.given_name || ''), lastName: String(claims.family_name || ''), fullName: String(claims.name || claims.given_name || ''), lastLoginAt: new Date(),
  };
  let user = await UserModel.findOne({ auth0Id });
  if (!user) {
    user = await UserModel.create({ auth0Id, ...fields, role: 'STUDENT' });
    await StudentProfileModel.create({ userId: user._id });
  } else {
    Object.assign(user, fields);
    await user.save();
  }
  return user;
}
import { getEmailApi } from '../utility/getEmailApi';
import { Resend } from 'resend';

// TODO - Modularize Components into shared library
// Email Templates

interface AuthTokenSubstitutions {
  token: number;
}

export const AuthTokenTemplate = ({ token }: AuthTokenSubstitutions) => {
  return (
    <div>
      <h1>Here is your login code!</h1>
      <p>{token}</p>
      <p>This code will expire in 5 minutes.</p>
    </div>
  );
};

interface NewGoalSubstitutions {
  email: string;
  goal: string;
  notes?: string;
  dueDate: Date;
  darumaDescription: string;
}

export const NewGoalTemplate = ({
  email,
  goal,
  notes,
  dueDate,
  darumaDescription,
}: NewGoalSubstitutions) => {
  return (
    <div>
      <h5>Welcome, {email}!</h5>
      <p>You have just created a new goal!</p>
      <p>Here are the details:</p>
      <p>Description: {goal}</p>
      <p>Notes: {notes}</p>
      <p>Due Date: {new Date(dueDate).toDateString()}</p>
      <p>Daruma: {darumaDescription}</p>

      <p>Good luck!</p>
    </div>
  );
};

// Email Service

interface EmailDetails {
  email: string;
  subject: string;
  substitutions: AuthTokenSubstitutions | NewGoalSubstitutions;
  template: React.FC<Readonly<AuthTokenSubstitutions | NewGoalSubstitutions>>; // TODO: Make this and substitutions be the same enum
}

export const sendIndividualEmail = async ({
  email,
  substitutions,
  template,
  subject,
}: EmailDetails) => {
  const resend = new Resend(getEmailApi(email));

  const data = await resend.emails.send({
    from: 'DarumaBoard <onboarding@resend.dev>', // TODO - Validate domain and have this be called from db || env
    to: [email],
    subject,
    react: template(substitutions),
  });

  return data;
};

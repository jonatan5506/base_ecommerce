import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import CredentialsSignUpForm from './credentials-signup-form';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUpPage = async () => {

  const session = await auth();

  if (session) {
    return redirect('/');
  }


  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image src='/images/logo.svg' width={100} height={100} alt={`${APP_NAME} logo`} priority={true}/>
          </Link>
          <CardTitle className='text-center'>Crie sua conta</CardTitle>
          <CardDescription className="text-center">Entre com suas informações para continuar</CardDescription>
        </CardHeader>
        {/* Formulário de SignUp */}
        <CardContent className='space-y-4'>
            <CredentialsSignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;

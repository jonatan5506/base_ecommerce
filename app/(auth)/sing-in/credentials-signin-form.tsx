'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { siginDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useActionState } from 'react'; //Gerencia o estado de ações do servidor
import { useFormStatus } from 'react-dom'; //Fornece o status atual do formulário
import { signInWithCredentials } from '@/lib/actions/user.actions';

const CredentialsSignInForm = () => {
  
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-auto px-6" variant="default" disabled={pending}>
        {pending ? 'Aguarde...' : 'Sign In'}
      </Button>
    );
  };

  return (
    <form action={action}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={siginDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={siginDefaultValues.password}
          />
        </div>
        <div className="flex justify-center">
          <SignInButton />
        </div>

        {/* Mensagem de erro para credenciais incorretas */}
        {data?.message && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Não possui uma conta?{' '}
          <Link href="/sign-up" className="text-primary hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;

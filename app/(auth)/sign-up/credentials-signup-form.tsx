'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sigUpDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useActionState } from 'react'; //Gerencia o estado de ações do servidor
import { useFormStatus } from 'react-dom'; //Fornece o status atual do formulário
import { signUpUser } from '@/lib/actions/user.actions';

const CredentialsSignUpForm = () => {
  
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-auto px-6" variant="default" disabled={pending}>
        {pending ? 'Enviando...' : 'Cadastre-se'}
      </Button>
    );
  };

  <div className='flex-bu'></div>

  return (
    <form action={action}>
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder='Informe seu nome completo'
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={sigUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder='exemplo@email.com'
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={sigUpDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            placeholder='Informe sua senha'
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={sigUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor="password">Confirme sua senha</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            placeholder='confirme sua senha'
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue={sigUpDefaultValues.confirmPassword}
          />
        </div>
        <div className="flex justify-center">
          <SignUpButton />
        </div>

        {/* Mensagem de erro para credenciais incorretas */}
        {data?.message && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          Já possui uma conta?{' '}
          <Link href="/sing-in" className="text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignUpForm;

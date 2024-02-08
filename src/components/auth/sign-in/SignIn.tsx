import LoginButton from './SignInButton';
import UserProfile from './UserProfile';

const SignIn = () => {
  return (
    <main className="min-w-screen flex min-h-[calc(100svh-128px)] flex-col items-center justify-center">
      <div className=" flex flex-col items-center justify-center gap-4 ">
        <UserProfile />
        <LoginButton size="lg" />
      </div>
    </main>
  );
};

export default SignIn;

import SignInButton from './SignInButton';
import UserProfile from './UserProfile';

const SignIn = () => {
  return (
    <main className="min-w-screen flex min-h-[calc(100svh-128px)] flex-col items-center justify-center">
      <div className=" flex flex-col items-center justify-center gap-4 ">
        <h2 className="text-lg font-bold sm:text-4xl">
          스튜디오에 접근하려면 로그인하세요.
        </h2>
        <h3 className="text-base sm:text-xl">현재 등록된 사용자:</h3>
        <UserProfile />
        <SignInButton size="lg" />
      </div>
    </main>
  );
};

export default SignIn;

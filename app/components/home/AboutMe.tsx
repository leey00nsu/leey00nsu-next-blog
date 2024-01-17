import tw from '@/app/libs/tw';

import GithubChart from './GithubChart';

const AboutMe = () => {
  const heading2Classes = 'text-xl sm:text-4xl';
  const heading3Classes = 'text-base sm:text-xl';
  const paragraphClasses = 'text-sm sm:text-lg';
  const highlightClasses = 'text-personal-blue text-3xl sm:text-6xl';

  return (
    <article className="flex min-h-[calc(100dvh-128px)] flex-col items-center ">
      <div className="flex max-w-4xl flex-col justify-center gap-8 p-8 ">
        <section className="flex w-full flex-col justify-start font-bold">
          <h2 className={heading2Classes}>
            <span>안녕하세요</span>
            <span className={highlightClasses}>.</span>
          </h2>
          <h2 className={heading2Classes}>
            <span className={tw(highlightClasses, 'mr-2')}>leey00nsu</span>
            <span>블로그입니다</span>
            <span className={highlightClasses}>.</span>
          </h2>
          <h2 className={heading2Classes}>
            <span>느낀 것을 기록하고, 공유합니다</span>
            <span className={highlightClasses}>.</span>
          </h2>
        </section>

        <section className="flex w-full flex-col justify-start text-xl font-medium">
          <h3 className={heading3Classes}>
            프론트엔드 개발자로서 유저를 생각하는 UI/UX 구현을 지향합니다.
          </h3>
          <h3 className={heading3Classes}>
            사용자와 백엔드 개발자, 기획자, 디자이너 사이의 연결고리가 되기 위해
            노력합니다.
          </h3>
          <h3 className={heading3Classes}>
            주도적으로 문제를 해결할 수 있는 환경을 선호합니다.
          </h3>
        </section>

        <section className="mb-10 flex w-full flex-col justify-start text-lg font-light">
          <p className={paragraphClasses}>
            자바스크립트 생태계에 큰 흥미를 느끼고 있습니다.
          </p>
          <p className={paragraphClasses}>
            <code>React</code>
            <span>,</span>
            <code>Next.js</code>
            <span>, 그리고 </span>
            <code>Nest.js</code>
            <span>를 활용한 풀스택 어플리케이션에 관심이 많습니다.</span>
          </p>
        </section>

        <GithubChart />
      </div>
    </article>
  );
};

export default AboutMe;

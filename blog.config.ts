const blogConfig = {
  githubEmail: 'dbstndla1212@naver.com', // Oauth 인증 GitHub 이메일
  domain: 'https://blog.leey00nsu.com', // 블로그 도메인
  owner: 'leey00nsu', // GitHub 사용자 이름
  repo: 'leey00nsu-next-blog', // GitHub 레포지토리 이름
  branch: 'main', // 브랜치 이름
  postPath: 'public/posts/blog', // 블로그 포스트 저장 경로
  addCommitMessage: 'docs. 새 글 추가', // 글 추가시 커밋 메시지
  editCommitMessage: 'docs. 글 수정', // 글 수정시 커밋 메시지
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif'], // 허용되는 이미지 타입
};

export default blogConfig;

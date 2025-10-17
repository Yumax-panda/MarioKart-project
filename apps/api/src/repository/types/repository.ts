import type {
  AccountRepository,
  AuthStateRepository,
  PostRepository,
  SessionRepository,
  TagRepository,
  UserRepository,
} from ".";

export interface Repository {
  account: AccountRepository;
  authState: AuthStateRepository;
  post: PostRepository;
  session: SessionRepository;
  tag: TagRepository;
  user: UserRepository;
}

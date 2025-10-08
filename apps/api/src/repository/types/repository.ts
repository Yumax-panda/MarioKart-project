import type {
  AccountRepository,
  PostRepository,
  SessionRepository,
  TagRepository,
  UserRepository,
} from ".";

export interface Repository {
  account: AccountRepository;
  post: PostRepository;
  session: SessionRepository;
  tag: TagRepository;
  user: UserRepository;
}

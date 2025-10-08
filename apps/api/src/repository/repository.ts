import { inject, injectable } from "tsyringe";
import type {
  AccountRepository,
  PostRepository,
  Repository,
  SessionRepository,
  TagRepository,
  UserRepository,
} from "./types";

// TODO:
@injectable()
export class RepositoryImpl implements Repository {
  constructor(
    @inject("AccountRepository") public account: AccountRepository,
    @inject("PostRepository") public post: PostRepository,
    @inject("SessionRepository") public session: SessionRepository,
    @inject("TagRepository") public tag: TagRepository,
    @inject("UserRepository") public user: UserRepository,
  ) {}
}

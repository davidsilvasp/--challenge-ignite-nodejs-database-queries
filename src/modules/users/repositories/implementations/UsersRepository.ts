import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const usersWithGames = await this.repository.findOneOrFail({
      where: {
        id: user_id,
      },
      relations: ["games"],
    });

    return usersWithGames;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    return await this.repository.query(
      "SELECT * from users ORDER BY first_name"
    );
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    return await this.repository.query(
      "SELECT * FROM users AS u WHERE LOWER(u.first_name) = $1 AND LOWER(u.last_name) = $2",
      [first_name.toLocaleLowerCase(), last_name.toLocaleLowerCase()]
    );
  }
}

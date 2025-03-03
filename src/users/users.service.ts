/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) 
  private usersRepo: Repository<User>) {}

  async findOrCreateGitHubUser(profile: any): Promise<User> {
    let user = await this.usersRepo.findOne({
      where: { githubId: profile.id },
    });

    if (!user) {
      user = this.usersRepo.create({
        githubId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        profilePicture: profile.photos[0]?.value,
      });

      await this.usersRepo.save(user);
    }

    return user;
  }
}

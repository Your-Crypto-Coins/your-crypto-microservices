import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { User } from '@prisma/client';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  private select: { email: true; id: true; nickname: true; password: false };

  async findOne(id: Uuid): Promise<Omit<User, 'password'> | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.select,
    });
  }

  async create(dto: UserCreateDto): Promise<Omit<User, 'password'>> {
    return this.prisma.user.create({
      data: dto,
      select: this.select,
    });
  }

  async update(dto: UserUpdateDto): Promise<Omit<User, 'password'>> {
    return this.prisma.user.update({
      data: dto,
      where: { id: dto.id },
      select: this.select,
    });
  }
}

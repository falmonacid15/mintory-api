import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { comparePassword, hashPassword } from '../../utils/password';
import { generatePayload } from '../../utils/payload';

import { AuthResponse } from '../../types/responses/auth.response';
import { UsersService } from '../users/users.service';
import { DEFAULT_CATEGORIES } from 'src/constants/default-data';
import { CategoriesService } from '../categories/categories.service';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { Category, TransactionType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async login(data: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.findOne({ email: data.email });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = await generatePayload(user);

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Inicio de sesión exitoso',
      accessToken: accessToken,
      payload: payload,
    };
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const user = await this.userService.findOne({ email: data.email });

    if (user) {
      throw new UnauthorizedException('Este usuario ya existe');
    }

    data.password = await hashPassword(data.password);

    const newUser = await this.userService.create(data);

    const categoriesToCreate = DEFAULT_CATEGORIES.map((category) => ({
      ...category,
      userId: newUser.data.id,
    }));

    await this.categoriesService.createMany(categoriesToCreate);

    const payload = await generatePayload(newUser.data);

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Cuenta creada exitosamente',
      accessToken: accessToken,
      payload: payload,
    };
  }
}

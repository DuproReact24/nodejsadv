import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    // Send token to Auth Service for validation
    const authResponse = await firstValueFrom(
      this.authClient.send({ cmd: 'validate_token' }, { token }),
    );

    if (!authResponse.isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    // Attach user data to the request
    request.user = authResponse.user;
    return true;
  }
}
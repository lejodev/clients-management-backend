import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided')
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync(token,
        {
          secret: 'temporaryJWTSECRET'
        })
        
      request.user = payload
      
      return requiredRoles.some(role => payload.role === role)
    } catch (error) {
      throw new UnauthorizedException('Invalid token or unauthorized')
    }
  }
}

import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { SellerService } from '../../services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtHelper } from '../../services/jwt/jwt.service';


@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelper
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('No token provided')
    }
    const payload = await this.jwtHelper.decodeToken(token)
    console.log('Token', payload);
    if (!payload) {
      throw new UnauthorizedException('Carechimba')
    }
    request.user = payload
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {

    const authHeader = request.headers['authorization']

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(" ")[1]
      return token
    }
    return undefined
  }

}

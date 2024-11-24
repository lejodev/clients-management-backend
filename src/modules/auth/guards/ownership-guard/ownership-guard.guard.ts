import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtHelper } from '../../services/jwt/jwt.service';

@Injectable()
export class OwnershipGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelper) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userIdToUpdate = request.params.id
    const token = request.headers['authorization'].split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('No token provided')
    }

    const payload = await this.jwtHelper.decodeToken(token)
    console.log(payload.sub,userIdToUpdate );
    
    if(payload.sub != userIdToUpdate) {
      throw new UnauthorizedException('You are not the owner of this resource')      
    }
    request.user = payload
    console.log('Owner');
    
    return true;
  }
}

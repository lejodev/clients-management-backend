import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { SellerService } from '../../services/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private sellerService: SellerService,
    private jwtService: JwtService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    console.log("TTOOKKEENN", token);
    if (!token) {
      throw new UnauthorizedException('No authorized')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token,
        {
          secret: "temporaryJWTSECRET"
        }
      )
      const user = await firstValueFrom(this.sellerService.findBy({ email: payload.email }))
      console.log(user, user.role.id);
      
      if (user.role.id == 1) {
        console.log("INNNNN");
        
        request.user = user
        return true
      }
      throw new ForbiddenException("This action can only be done by a Seller, contact one")
    } catch (error) {
      console.log("NIOACA", error);

     if(error instanceof ForbiddenException) {
      throw error
     }
      
      throw new UnauthorizedException("You are not authorized")
    }
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

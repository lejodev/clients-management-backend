import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type userPayload = {
    email: string,
    sub: number,
    role: number
}

@Injectable()
export class JwtHelper {

    constructor(private jwtService: JwtService) { }

    async decodeToken(token: string): Promise<userPayload> {
        try {
            const payload = await this.jwtService.verifyAsync(token,
                {
                    secret: 'temporaryJWTSECRET'
                })
            return payload
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token')
        }
    }

}
export { JwtService };


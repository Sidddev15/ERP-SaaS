import { prisma } from "@sme-erp/db";
import argon2 from 'argon2';

export const AuthService = {
    async registerUser(tenantId: string, fullName: string, email: string, password: string) {
        const hashed = await argon2.hash(password);

        return prisma.user.create({
            data: {
                tenantId,
                fullName,
                email,
                password: hashed,
                role: 'admin'
            }
        })
    },

    async validateUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) return null;

        const valid = await argon2.verify(user.password, password);
        if (!valid) return null;

        return user;
    }
}

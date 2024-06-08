import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { RolesGuard } from './auth/guard/roles.guard';
// import { APP_GUARD } from '@nestjs/core';
// import { RoleModule } from './auth/guard/role.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongodbnodejs:mongodbnodejs@serverpost.mgmi4.mongodb.net/PHAMTUANKHOI_DB_TESTING',
    ),
    UserModule,
    AuthModule,
    // RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}

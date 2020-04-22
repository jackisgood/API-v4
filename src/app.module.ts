import { Module } from '@nestjs/common';
import { TypeOrmModule }from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';
import { Ecgdata12Module } from './ecgdata12/ecgdata12.module';
import { Ecgdata12 } from './ecgdata12/ecgdata12.entity';
import { Ecgrealtime3Module } from './ecgrealtime3/ecgrealtime3.module';
import { Ecgrealtime3 } from './ecgrealtime3/ecgrealtime3.entity';
import { Ecg3_raw } from './users/ecg3_raw.entity';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/photo.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist'),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '192.168.25.22',
      port: 27017,
      database: 'ecg',
      entities: [User,Ecgdata12,Photo,Ecgrealtime3,Ecg3_raw],
      synchronize: true,
    }),
        PhotoModule,
        UserModule,
        Ecgdata12Module,
        Ecgrealtime3Module,

  ],
})
export class AppModule {}

import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
@Global()
@Module({
    imports:[ElasticsearchModule.registerAsync({
        imports:[ConfigModule],
        useFactory: async (configservice:ConfigService)=>({
            node:configservice.get<string>('ELASTIC_NODE')||'',
            auth:{
                username:configservice.get<string>('ELASTIC_USER')||'' ,
                password:configservice.get<string>('ELASTIC_PASS')||''
            },
            tls:{
                rejectUnauthorized:false
            }
            

        }),
        inject:[ConfigService]
    })],
    exports:[ElasticsearchModule]
})
export class ElasticModule {
   
}

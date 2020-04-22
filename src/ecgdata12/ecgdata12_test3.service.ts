import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan, InsertResult } from 'typeorm';
import { Ecgdata12 } from './ecgdata12.entity';
import { User } from '../users/user.entity';
import { Ecg3_raw } from '../users/ecg3_raw.entity';
import { Ecgrealtime3 } from '../ecgrealtime3/ecgrealtime3.entity';
import { UserService } from 'src/users/user.service';
import { ApiAcceptedResponse } from '@nestjs/swagger';
const sample_rate=256;
@Injectable()
export class Ecgdata12Service {
  constructor(
    @InjectRepository(Ecgdata12)
    private readonly ecgdata12Repository: Repository<Ecgdata12>,
    @InjectRepository(Ecgrealtime3)
    private readonly ecgrealtime3Repository: Repository<Ecgrealtime3>,
	    @InjectRepository(Ecg3_raw)
	    private readonly ecg3_rawRepository: Repository<Ecg3_raw>,
	    private readonly userService: UserService
  ) { }
    
  async createEcgdata12(params): Promise<InsertResult> {
    return await this.ecgdata12Repository.createQueryBuilder()
      .insert()
      .into(Ecgdata12)
      .values(params)
      .execute();
  }

  async findEcgdata12ByUser(params) {
    // find all
    params.from=parseInt(params.from);
    params.to=parseInt(params.to);

    //if (!params.from && !params.limit && !params.to)
		
    //  return await this.ecgdata12Repository.find({user: { userId: params.id }});

    const query: any = {
      where: {  'Patient_CodeID' : params.id },
      order: { 'Ecg_time': 'DESC' },
      
      };
    //  if (params.to) {
    //     query.where.time = Between(params.from, params.to);
    //   }
    //   else {
    //   query.where.time = MoreThan(params.from);

    //   //query.take = params.limit || 2304;
    //  }

    if (params.to) {
     query.where.Ecg_time= {$gte:params.from , $lte:params.to};
     query.take=sample_rate*5; 
     }
     else{
      query.take=1;
     } 
    
  
  if (Boolean((await this.userService.getUserById(params.id)).userId ))
  var _get = await this.ecgrealtime3Repository.findOne(query);
  var sss="test time  " + _get.Ecg_time;
  var cnt=0;
  var packet_cnt=0;
  var total_packet:any = [];
  var I: Ecgdata12[] = [];
  var II: Ecgdata12[] = [];
  var III: Ecgdata12[] = [];
  var V1: Ecgdata12[] = [];
  var V2: Ecgdata12[] = [];
  var V3: Ecgdata12[] = [];
  var V4: Ecgdata12[] = [];
  var V5: Ecgdata12[] = [];
  var V6: Ecgdata12[] = [];
  var aVR: Ecgdata12[] = [];
  var aVL: Ecgdata12[] = [];
  var aVF: Ecgdata12[] = [];
  var time=0.0;
  var d1:any=[];
  var d2:any=[];
  var d3:any=[];
  var a1:any=[];
  var a2:any=[];
  var a3:any=[];
  query.where.Ecg_time=_get.Ecg_time;
  var _get2 = await this.ecg3_rawRepository.findOne(query);
   
  var z=new Array(256).fill(0);
  
  d1=d1.concat(_get.Diff_1);
  d2=d2.concat(_get.Diff_2);
  d3=d3.concat(_get.Diff_3);
  //d1=d1.map(x=>x*1000);
  //d2=d2.map(x=>x*1000);
  //d3=d3.map(x=>x*1000);
  a1=a1.concat(_get2.Diff_1);
  a2=a2.concat(_get2.Diff_2);
  a3=a3.concat(_get2.Diff_3);
  a1=a1.map(x=>x*1000);
  a2=a2.map(x=>x*1000);
  a3=a3.map(x=>x*1000);
  //_get.Diff_3=_get.Diff_3.map(x=>x*1000);
    total_packet[packet_cnt]={
    'userId':params.id,
    'time':_get.Ecg_time,
      'I':z,
      'II':z,
      'III':z,
      'V1':a1,
      'V2':d1,
      'V3':a2,
      'V4':d2,
      'V5':a3,
      'V6':d3,
      'aVR':z,
      'aVL':z,
      'aVF':z, 
    } 
    var text="Draw "+_get.Ecg_time;
	console.log(text);   
    
    
    
    


    return total_packet;
  }

  async deleteEcgdata12ByUser(user){
    return await this.ecgdata12Repository.delete({user});
  }
}

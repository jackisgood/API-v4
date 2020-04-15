import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThan, InsertResult } from 'typeorm';
import { Ecgdata12 } from './ecgdata12.entity';
import { User } from '../users/user.entity';
import { UserService } from 'src/users/user.service';
import { ApiAcceptedResponse } from '@nestjs/swagger';
const sample_rate=256;
@Injectable()
export class Ecgdata12Service {
  constructor(
    @InjectRepository(Ecgdata12)
    private readonly ecgdata12Repository: Repository<Ecgdata12>,
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
      where: {  userId : params.id },
      order: { time: 'DESC' },
      
      };
    //  if (params.to) {
    //     query.where.time = Between(params.from, params.to);
    //   }
    //   else {
    //   query.where.time = MoreThan(params.from);

    //   //query.take = params.limit || 2304;
    //  }

    if (params.to) {
     query.where.time= {$gte:params.from , $lte:params.to};
     query.take=sample_rate*5; 
     }
     else{
      query.take=sample_rate;
     } 
    
  
  if (Boolean((await this.userService.getUserById(params.id)).userId ))
  var _get = await this.ecgdata12Repository.find(query);
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
  _get.forEach(p=>
  {
      if (cnt==0) {
      time=p.time;
      }
      cnt++;
          var tmp  :any;
          var tmp2: any ;
          var tmp3 : any;
          var tmp4 : any;
          var tmp5 : any;
          var tmp6 : any;
          var tmp7 : any;
          var tmp8 : any;
          var tmp9 : any;
          var tmp10 : any;
          var tmp11 : any;
	  var tmp12 : any;
	      tmp=p.I.toFixed(2);
	      tmp2=p.II.toFixed(2);
	      tmp3=p.III.toFixed(2);
	      tmp4=p.V1.toFixed(2);
	      tmp5=p.V2.toFixed(2);
	      tmp6=p.V3.toFixed(2);
	      tmp7=p.V4.toFixed(2);
	      tmp8=p.V5.toFixed(2);
	      tmp9=p.V6.toFixed(2);
	      tmp10=p.aVR.toFixed(2);
	      tmp11=p.aVL.toFixed(2);
	      tmp12=p.aVF.toFixed(2);
            I.unshift(tmp);
            II.unshift(tmp2);
            III.unshift(tmp3);
            V1.unshift(tmp4);
	    V2.unshift(tmp5);
	    V3.unshift(tmp6);
	    V4.unshift(tmp7);
	    V5.unshift(tmp8);
	    V6.unshift(tmp9);
            aVR.unshift(tmp10);
	    aVL.unshift(tmp11);
	    aVF.unshift(tmp12);
            if(cnt==sample_rate) {
              total_packet[packet_cnt]={
	      'userId':params.id,
	      'time':time,
                'I':I,
                'II':II,
                'III':III,
                'V1':V1,
                'V2':V2,
                'V3':V3,
                'V4':V4,
                'V5':V5,
                'V6':V6,
                'aVR':aVR,
                'aVL':aVL,
                'aVF':aVF, 
              } 
              cnt=0;
              packet_cnt++;
              I  = [];
              II  = [];
              III  = [];
              V1  = [];
              V2  = [];
              V3  = [];
              V4  = [];
              V5  = [];
              V6  = [];
              aVR  = [];
              aVL  = [];
              aVF  = [];
            }
      }
    );
    total_packet[packet_cnt]={
    'userId':params.id,
    'time':time,
      'I':I,
      'II':II,
      'III':III,
      'V1':V1,
      'V2':V2,
      'V3':V3,
      'V4':V4,
      'V5':V5,
      'V6':V6,
      'aVR':aVR,
      'aVL':aVL,
      'aVF':aVF, 
    } 
    
    var total_packetaaa: any = [];
    var i;
    if(cnt > 0) {
     packet_cnt
    }
    if(params.to) {
    for (i=0;i<packet_cnt+cnt/sample_rate;i++) {
      total_packetaaa.unshift(total_packet[i]);  
      }
    }
    else {
    total_packetaaa.unshift(total_packet[0]);
    }
    
    
    
    
    


    return total_packetaaa;
  }

  async deleteEcgdata12ByUser(user){
    return await this.ecgdata12Repository.delete({user});
  }
}

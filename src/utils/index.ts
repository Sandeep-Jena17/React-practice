export function calculateMetrics(data: any[]) {
    let totalClicks = 0;
    let totalCommission = 0.0;
    let totalRequests = 0;
    let totalCTR = 0.0;
    // let totalCPC = 0.0;
  
    data.forEach((ad:any) => {
        totalClicks += parseInt(ad.CLICKS);
        totalCommission += ad['Total Commission']?parseFloat(ad["Total Commission"].replace('$', '')):0.0;
        totalRequests += parseFloat(ad.Ad_Requests);
        totalCTR += ad.CTR;
        // totalCPC += ad.CPC?parseFloat(ad.CPC):0.0;
    });
  
    const averageCTR = (totalClicks / totalRequests) * 100;
     const averageCPC = totalCommission / totalClicks;
  
    const finalCommission=totalCommission.toFixed(2)
    const finalAverageCTR=averageCTR.toFixed(2)
   const finalAverageCPC=averageCPC.toFixed(2)
    
  
    return {
      totalClicks:String(totalClicks),
        finalCommission,
        totalRequests:String(totalRequests),
        finalAverageCTR:`${finalAverageCTR} %`  ,
        finalAverageCPC
    };
  }
  
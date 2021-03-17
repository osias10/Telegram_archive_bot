const webConvert = require('./utils/webConvert');
const fs=require('fs');
const moment = require('moment');

async function makeArchive(link,nickname){

    const nowTime=moment().format('YYYY-MM-DD_HH-mm-ss');

    const pngName = await webConvert.getImg(link,nickname,nowTime);
    const pdfName = await webConvert.getPdf(link,nickname,nowTime).catch(e=> console.log(e));

    
    
    return [pngName,pdfName];

}

const deleteFile = async (fileName) =>{
    if (fileName!=undefined){
        fs.access(`./../files/${fileName}`,fs.constants.F_OK,(err)=>{
            if (err) return console.log("삭제할수 없는 파일입니다.");
            else{
                fs.unlink(`./../files/${fileName}`,function(err){
                    if(err) throw err;
                    console.log(`${fileName} 삭제완료`);
                });
            }
        })
    
    
        
    }
    
}


module.exports = {
    makeArchive,
    deleteFile
}
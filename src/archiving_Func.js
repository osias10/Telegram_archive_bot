const webConvert = require('./utils/webConvert');
const fs=require('fs');

async function makeArchive(link,nickname){
    const pngName = await webConvert.getImg(link,nickname);
    const pdfName = await webConvert.getPdf(link,nickname);

    
    
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
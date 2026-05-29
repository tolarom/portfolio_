const fs=require('fs');
const kv=fs.readFileSync('.env','utf8');
const m=kv.match(/^API_KEY=(.*)$/m);
const key=m?m[1]:'';
if(!key){console.error('no key'); process.exit(1);} 
(async()=>{ 
  try{
    const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models?key='+encodeURIComponent(key));
    console.log('status',res.status);
    const t=await res.text();
    console.log(t);
  }catch(e){console.error(e);process.exit(1);} 
})();

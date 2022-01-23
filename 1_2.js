function revrot(str, sz) {
    let result;
    let arr=[];
      if( sz<= 0||str==""||sz>str){
        return "";
      }else{
        let parts = Math.floor(str.length/sz);
        let begin = 0;      
        for(i=0; i<=parts; i++){    
          arr[i] = str.substr(begin,sz);
          begin = begin+sz;
          if(arr[i].length<sz) arr.pop(arr[i]);
        }
        
       for(let elem of arr){
       console.log(result);
       result += sumKub(elem);
       }
  }
    
        function sumKub(chunk){
          let sumChunk = 0;
           for(let i=0; i<chunk.length; i++){
           sumChunk += chunk[i]**3;
           }
          return (sumChunk %2 == 0)?reverseString(chunk):chunk.substr(1)+chunk.charAt(0);
        }
        
        function reverseString(chunk){
         return (chunk==='')?'':reverseString(chunk.substr(1))+chunk.charAt(0);
        //return chunk.split('').reverse().join('');
        }   
           
  revrot('733049910872815764', 5);
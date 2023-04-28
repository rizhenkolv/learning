
// first option

function base64ToBase16(base64) {
    return window.atob(base64)
        .split('')
        .map(function (aChar) {
          return ('0' + aChar.charCodeAt(0).toString(16)).slice(-2);
        })
       .join('')
       .toUpperCase(); // Per your example output
  }
  
  console.log(base64ToBase16("AC40W1sAgAEAEig="));// 


  // second option
  function base64_2(base64) {
    console.log([...atob(base64)])
    return [...atob(base64)].map(c => c.charCodeAt(0).toString(16).padStart(2,0)).join('').toUpperCase();
  }


  console.log(base64_2("AC40WlgAgAEAEig="))
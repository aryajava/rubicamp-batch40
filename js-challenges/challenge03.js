function romawi(angka) 
{
  var desc = [1,4,5,9,10,40,50,90,100,400,500,900,1000];
  var roma = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M"];
  var hasil='';
  
  for(var i=12; i >=0; i--) 
  {
     while(angka >= desc[i]) 
     {
    	angka-= desc[i];
    	hasil+= roma[i];
     }
  }
			
  return hasil;
}

console.log("Result: ", romawi(4)); // IV
console.log("Result: ", romawi(9)); // IX
console.log("Result: ", romawi(13)); // XIII
console.log("Result: ", romawi(1453)); // MCDLIII
console.log("Result: ", romawi(1646)); // MDCXLVI
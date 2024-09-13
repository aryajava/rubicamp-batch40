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


console.log("Script Testing untuk Konversi Romawi\n");
console.log("Input | expected | result");
console.log("======|==========|========");
console.log("4     | IV       | ", romawi(4));
console.log("9     | IX       | ", romawi(9));
console.log("13    | XIII     | ", romawi(13));
console.log("1453  | MCDLIII  | ", romawi(1453));
console.log("1646  | MDCXLVI  | ", romawi(1646));
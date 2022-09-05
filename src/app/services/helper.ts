// export function binarySearch(ar:any[], el, compare_fn) {
//     var m = 0;
//     var n = ar.length - 1;
//     while (m <= n) {
//         var k = (n + m) >> 1;
//         var cmp = compare_fn(el, ar[k]);
//         if (cmp > 0) {
//             m = k + 1;
//         } else if(cmp < 0) {
//             n = k - 1;
//         } else {
//             return k;
//         }
//     }
//     return -m - 1;
// }
export function binarySearch(arr:any[], field:string, compareVal:any) {
// function searchByEmail(email, customers) {
    let start = 0;
    let end = arr.length - 1;
  
    while (start <= end) {
      let middle = Math.floor((start + end) / 2);
  
      if (arr[middle][field] === compareVal) {
        return middle;
      } else if (arr[middle][field] < compareVal) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
    return -1;
  }
async function main() {
  let z = await doMath_slow(2, 3);
  console.log(`z is ${z}`);

  let j = await doMath(z, 5);
  console.log(`j is ${j}`);
}

main();

function doMath(x, y) {
    let temp = x + y;
    return new Promise(resolve => {
        resolve(temp);
        console.log("fast promise is done");
    });
  }


async function doMath_slow(x, y) {
  let temp = x + y;
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(temp);
      console.log("slow promise is done");
    }, 2000);
  });
}

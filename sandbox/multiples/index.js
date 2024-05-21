var list = Array.from(Array(101).keys());
list.splice(0, 1)

list.forEach(x => {
  console.log(
    `Number ${x}:`,
    [3, 5].map(divisor => !(x % divisor) ? `multiple of ${divisor}` : '')
          .filter(x => x)
          .join(', '));
});

const emodji = [
  '🐶', '🐱', '🐭', '🐹', '🐰',
  '🐻', '🐼', '🐨', '🐯', '🦁',
  '🐮', '🐷', '🐸', '🐙', '🐵',
  '🦄', '🐞', '🦀', '🐟', '🐊',
  '🐓', '🦃', '🐿'
];

const getEmodjiSubsample = (nItems) => {
    const shuffle = (arr, n) => {
      let shuffled = arr.slice(0), i = arr.length, min = i - n, temp, index;
      while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
        }
        return shuffled.slice(min);
    };
    const tmp = shuffle(emodji, nItems / 2);
    return shuffle([...tmp, ...tmp], nItems);
  };

  export default getEmodjiSubsample;
  

export function getRandoms(count: number, max: number) {
  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * max) + 1;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

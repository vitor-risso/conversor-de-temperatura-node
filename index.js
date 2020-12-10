const puppeteer = require('puppeteer');
var readlineSync = require('readline-sync');


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let tempInicial = readlineSync.question('Qual a temperatura inicial?(celsius, fahrenheit, kelvin) ') || 'celsius'
  let tempFinal = readlineSync.question('Qual a temperatura final? ') || 'fahrenheit'
  await page.goto(`https://www.google.com/search?client=ubuntu&hs=80p&channel=fs&sxsrf=ALeKk00mpSc8p1NmxXs9NXZ7V29V4i6JTQ%3A1607629285558&ei=5XnSX4TMIZGz5OUPoNq74Ac&q=${tempInicial}+para+${tempFinal}`);

  const LastInputValue = await page.evaluate(() => {
    const allinput = document.querySelectorAll('.vXQmIe.gsrt')
    const rightInput = allinput[allinput.length - 1]

    return rightInput.value
  });

  const firstInputValue = await page.evaluate(() => {
    const allinput = document.querySelectorAll('.vXQmIe.gsrt')
    const rightInput = allinput[0]

    return rightInput.value
  });

  console.log(firstInputValue +' em '+ tempInicial + ' são ' + LastInputValue + ' em ' + tempFinal)
  await page.screenshot({path: 'ola.png'})

  await browser.close();
})();



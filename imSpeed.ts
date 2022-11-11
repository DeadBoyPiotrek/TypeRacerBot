const link = 'https://play.typeracer.com?rt=h1ynjebjw';

// const link = 'https://play.typeracer.com'
import puppeteer, { ElementHandle } from 'puppeteer';
const scrape = async (): Promise<void> => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
  });
  const page = (await browser.pages())[0];
  page.setViewport({
    width: 2560,
    height: 1440,
  });
  // set agent
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
  );
  await page.goto(link);
  try {
    //! click disagree button
    const disagreeButton = await page.$('.css-1hy2vtq');
    await disagreeButton?.click();

    //! click enter race button
    // await page.waitForXPath("//a[text()='Enter a Typing Race']");
    // const [enterRaceButton] = await page.$x(
    //   "//a[text()='Enter a Typing Race']"
    // );
    // await (enterRaceButton as ElementHandle<HTMLElement>).click();

    //! get text
    await page.waitForSelector('[unselectable="on"]');
    const textSpans = await page.$$('[unselectable="on"]');

    const textSpansTexts = [];
    for (const span of textSpans) {
      const text = await page.evaluate(body => body.innerHTML, span);
      textSpansTexts.push(text);
    }

    const text = textSpansTexts.join('');
    // //! click input field
    await page.waitForSelector('[title="Time remaining"]');
    //* if you dont want to be disqualified use line below
    await page.waitForTimeout(10000);

    await page.waitForXPath(
      '//*[@id="gwt-uid-22"]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/input'
    );
    const [raceInput] = await page.$x(
      '//*[@id="gwt-uid-22"]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/input'
    );
    // await page.waitForXPath(
    //   '//*[@id="gwt-uid-20"]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/input'
    // );
    // const [raceInput] = await page.$x(
    //   '//*[@id="gwt-uid-20"]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/input'
    // );
    await (raceInput as ElementHandle<HTMLElement>).click();

    //! type text
    await page.keyboard.type(text);
  } catch (error) {
    console.log('errorrrrrrrrr', error);
  }
};
scrape();

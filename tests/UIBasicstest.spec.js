//import one annotation from playwright module

const {test, expect} = require('@playwright/test');


test('Browser context playwright test',async ({browser})=>
{
    //chrome -plugins/cookies
     const context = await browser.newContext();
     const page = await context.newPage();
     const username = page.locator('#username');
     const signInBtn = page.locator('#signInBtn');
     const cardTitles= page.locator('.card-body a');
     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

     //css locator
     await username.fill('AkshataBandagale');
     await page.locator("[type='password']").fill('Learning@830$3mK2');
     await signInBtn.click();
     console.log(await page.locator("[style*='block']").textContent());

     await expect(page.locator("[style*='block']")).toContainText('Incorrect');

     await username.fill(''); //wiped out the username
      await username.fill('rahulshettyacademy');
     await signInBtn.click();
     console.log(await cardTitles.nth(1).textContent()); 
     console.log(await cardTitles.first().textContent());
     const allTextContents = await cardTitles.allTextContents();
     console.log(allTextContents);

}); 

test('Page playwright test',async ({page})=>
{

   await  page.goto('https://google.com');
   console.log(await page.title());
   await expect(page).toHaveTitle('Google');
}); 

test('UI controls',async ({page})=>
{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const username = page.locator('#username');
    const signInBtn = page.locator('#signInBtn');
    const dropdown = page.locator("select.form-control");
    const documentLink =page.locator("[href*='documents-request']");
    await dropdown.selectOption("stud");
    await
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect( await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class" ,"blinkingText");


    
    //await page.pause();

}); 

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 });
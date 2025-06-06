# Test info

- Name: Quick Search Feature (4pts) >> [1pt] quick search should be available on all pages
- Location: C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\quickSearch.spec.ts:43:2

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Invalid url: "/"
Call log:
  - navigating to "/", waiting until "load"

    at HomePage.goto (C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\pages\HomePage.ts:20:19)
    at C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\quickSearch.spec.ts:46:18
```

# Test source

```ts
   1 | import { Page, Locator } from "@playwright/test";
   2 | import { BasePage } from "./BasePage";
   3 |
   4 | /**
   5 |  * Page object for the home page
   6 |  */
   7 | export class HomePage extends BasePage {
   8 | 	readonly highlightArticles: Locator;
   9 | 	readonly featuredSection: Locator;
  10 |
  11 | 	constructor(page: Page) {
  12 | 		super(page);
  13 | 		this.highlightArticles = page.locator(".highlights-section .artwork-card");
  14 | 	}
  15 |
  16 | 	/**
  17 | 	 * Navigates to the home page
  18 | 	 */
  19 | 	async goto() {
> 20 | 		await this.page.goto("/");
     | 		                ^ Error: page.goto: Protocol error (Page.navigate): Invalid url: "/"
  21 | 		await this.page.waitForLoadState("networkidle");
  22 | 	}
  23 |
  24 | 	/**
  25 | 	 * Clicks on a highlighted article by its index
  26 | 	 * @param index The index of the article to click (0-based)
  27 | 	 */
  28 | 	async clickHighlightArticle(index: number) {
  29 | 		await this.highlightArticles.nth(index).click();
  30 | 		// await locator .artwork-detail
  31 | 		await this.page.waitForLoadState("networkidle");
  32 | 		await this.page.waitForSelector(".artwork-detail");
  33 | 	}
  34 |
  35 | 	/**
  36 | 	 * Gets the number of highlighted articles displayed
  37 | 	 * @returns The count of highlighted articles
  38 | 	 */
  39 | 	async getHighlightArticlesCount() {
  40 | 		return await this.highlightArticles.count();
  41 | 	}
  42 | }
  43 |
```
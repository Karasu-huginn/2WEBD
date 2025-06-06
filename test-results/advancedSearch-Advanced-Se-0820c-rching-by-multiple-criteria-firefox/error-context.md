# Test info

- Name: Advanced Search Feature (4pts) >> [1pt] should allow searching by multiple criteria
- Location: C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\advancedSearch.spec.ts:38:2

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Invalid url: "/advanced-search"
Call log:
  - navigating to "/advanced-search", waiting until "load"

    at AdvancedSearchPage.goto (C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\pages\AdvancedSearchPage.ts:34:19)
    at C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\advancedSearch.spec.ts:40:28
```

# Test source

```ts
   1 | import { Page, Locator, expect } from "@playwright/test";
   2 | import { BasePage } from "./BasePage";
   3 |
   4 | /**
   5 |  * Page object for the advanced search page
   6 |  */
   7 | export class AdvancedSearchPage extends BasePage {
   8 | 	readonly departmentSelect: Locator;
   9 | 	readonly dateFromInput: Locator;
  10 | 	readonly dateToInput: Locator;
  11 | 	readonly textSearchInput: Locator;
  12 | 	readonly tagsInput: Locator;
  13 | 	readonly artistInput: Locator;
  14 | 	readonly mediumSelect: Locator;
  15 | 	readonly searchButton: Locator;
  16 | 	readonly searchResults: Locator;
  17 |
  18 | 	constructor(page: Page) {
  19 | 		super(page);
  20 | 		this.departmentSelect = page.getByLabel("Département");
  21 | 		this.dateFromInput = page.getByLabel("Date de début");
  22 | 		this.dateToInput = page.getByLabel("Date de fin");
  23 | 		this.textSearchInput = page.getByLabel("Mots-clés");
  24 | 		this.searchButton = page
  25 | 			.locator('form[name="advanced-search"]')
  26 | 			.getByRole("button", { name: "Rechercher" });
  27 | 		this.searchResults = page.locator(".artwork-card");
  28 | 	}
  29 |
  30 | 	/**
  31 | 	 * Navigates to the advanced search page
  32 | 	 */
  33 | 	async goto() {
> 34 | 		await this.page.goto("/advanced-search");
     | 		                ^ Error: page.goto: Protocol error (Page.navigate): Invalid url: "/advanced-search"
  35 | 		await this.page.waitForLoadState("networkidle");
  36 | 	}
  37 |
  38 | 	/**
  39 | 	 * Performs an advanced search with the specified parameters
  40 | 	 * @param params The search parameters
  41 | 	 */
  42 | 	async performAdvancedSearch(params: {
  43 | 		department?: string;
  44 | 		dateFrom?: string;
  45 | 		dateTo?: string;
  46 | 		textSearch?: string;
  47 | 		tags?: string;
  48 | 		artist?: string;
  49 | 		medium?: string;
  50 | 	}) {
  51 | 		// Ensure we're working with the advanced-search form
  52 | 		if (params.department) {
  53 | 			await this.departmentSelect.selectOption(params.department);
  54 | 		}
  55 | 		if (params.dateFrom) {
  56 | 			await this.dateFromInput.fill(params.dateFrom);
  57 | 		}
  58 | 		if (params.dateTo) {
  59 | 			await this.dateToInput.fill(params.dateTo);
  60 | 		}
  61 | 		if (params.textSearch) {
  62 | 			await this.textSearchInput.fill(params.textSearch);
  63 | 		}
  64 | 		await this.searchButton.click();
  65 | 		await this.page.waitForLoadState("networkidle");
  66 | 		await expect(this.page.getByText("Résultats de Recherche")).toBeVisible({
  67 | 			timeout: 15000,
  68 | 		});
  69 | 	}
  70 |
  71 | 	/**
  72 | 	 * Gets the number of search results
  73 | 	 * @returns The count of search results
  74 | 	 */
  75 | 	async getResultsCount() {
  76 | 		return await this.searchResults.count();
  77 | 	}
  78 |
  79 | 	/**
  80 | 	 * Clicks on a search result by its index
  81 | 	 * @param index The index of the result to click (0-based)
  82 | 	 */
  83 | 	async clickSearchResult(index: number) {
  84 | 		await this.searchResults.nth(index).click();
  85 | 	}
  86 | }
  87 |
```
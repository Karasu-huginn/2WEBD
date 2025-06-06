# Test info

- Name: Item Detail Page (4pts) >> [2pts] should display comprehensive information about the item
- Location: C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\itemDetail.spec.ts:22:2

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Invalid url: "/object/229770"
Call log:
  - navigating to "/object/229770", waiting until "load"

    at ItemDetailPage.gotoItem (C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\pages\ItemDetailPage.ts:34:19)
    at C:\Users\erwan\Desktop\FOLDERS\2WEBD\2WEBD\tests\itemDetail.spec.ts:27:24
```

# Test source

```ts
   1 | import { Page, Locator } from "@playwright/test";
   2 | import { BasePage } from "./BasePage";
   3 |
   4 | /**
   5 |  * Page object for the item detail page
   6 |  */
   7 | export class ItemDetailPage extends BasePage {
   8 | 	readonly itemTitle: Locator;
   9 | 	readonly itemImage: Locator;
  10 | 	readonly itemDepartment: Locator;
  11 | 	readonly itemPeriod: Locator;
  12 | 	readonly itemArtist: Locator;
  13 | 	readonly itemDescription: Locator;
  14 | 	readonly itemDetails: Locator;
  15 |
  16 | 	constructor(page: Page) {
  17 | 		super(page);
  18 | 		this.itemTitle = page.getByRole("heading", { level: 1 });
  19 | 		this.itemImage = page.locator(".artwork-detail-image");
  20 | 		this.itemDepartment = page.getByText(/département/i).first();
  21 | 		this.itemPeriod = page.getByText(/période/i).first();
  22 | 		this.itemArtist = page.getByText(/artiste/i).first();
  23 | 		this.itemDescription = page.getByRole("region", { name: /description/i });
  24 | 		this.itemDetails = page.locator(
  25 | 			'.item-details, [aria-label="Détails de l\'objet"]',
  26 | 		);
  27 | 	}
  28 |
  29 | 	/**
  30 | 	 * Navigates to a specific item by its ID
  31 | 	 * @param id The item ID
  32 | 	 */
  33 | 	async gotoItem(id: string) {
> 34 | 		await this.page.goto(`/object/${id}`);
     | 		                ^ Error: page.goto: Protocol error (Page.navigate): Invalid url: "/object/229770"
  35 | 		await this.page.waitForLoadState("networkidle");
  36 | 	}
  37 |
  38 | 	/**
  39 | 	 * Gets the item title text
  40 | 	 * @returns The title text
  41 | 	 */
  42 | 	async getItemTitle() {
  43 | 		return await this.itemTitle.textContent();
  44 | 	}
  45 |
  46 | 	/**
  47 | 	 * Checks if the item image is loaded
  48 | 	 * @returns True if the image is loaded
  49 | 	 */
  50 | 	async isImageLoaded() {
  51 | 		return await this.itemImage.isVisible();
  52 | 	}
  53 |
  54 | 	/**
  55 | 	 * Gets all item details as a map
  56 | 	 * @returns A map of detail labels to values
  57 | 	 */
  58 | 	async getItemDetailsMap() {
  59 | 		const detailsMap = new Map<string, string>();
  60 | 		const details = await this.itemDetails.all();
  61 |
  62 | 		for (const detail of details) {
  63 | 			const label =
  64 | 				(await detail.locator("dt, .detail-label").textContent()) || "";
  65 | 			const value =
  66 | 				(await detail.locator("dd, .detail-value").textContent()) || "";
  67 | 			detailsMap.set(label.trim(), value.trim());
  68 | 		}
  69 |
  70 | 		return detailsMap;
  71 | 	}
  72 | }
  73 |
```
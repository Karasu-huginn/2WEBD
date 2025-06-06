import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page object for the item detail page
 */
export class ItemDetailPage extends BasePage {
	readonly itemTitle: Locator;
	readonly itemImage: Locator;
	readonly itemDepartment: Locator;
	readonly itemPeriod: Locator;
	readonly itemArtist: Locator;
	readonly itemDescription: Locator;
	readonly itemDetails: Locator;

	constructor(page: Page) {
		super(page);
		this.itemTitle = page.getByRole("heading", { level: 1 });
		this.itemImage = page.locator(".artwork-detail-image");
		this.itemDepartment = page.getByText(/département/i).first();
		this.itemPeriod = page.getByText(/période/i).first();
		this.itemArtist = page.getByText(/artiste/i).first();
		this.itemDescription = page.getByRole("region", { name: /description/i });
		this.itemDetails = page.locator(
			'.item-details, [aria-label="Détails de l\'objet"]',
		);
	}

	/**
	 * Navigates to a specific item by its ID
	 * @param id The item ID
	 */
	async gotoItem(id: string) {
		await this.page.goto(`/object/${id}`);
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Gets the item title text
	 * @returns The title text
	 */
	async getItemTitle() {
		return await this.itemTitle.textContent();
	}

	/**
	 * Checks if the item image is loaded
	 * @returns True if the image is loaded
	 */
	async isImageLoaded() {
		return await this.itemImage.isVisible();
	}

	/**
	 * Gets all item details as a map
	 * @returns A map of detail labels to values
	 */
	async getItemDetailsMap() {
		const detailsMap = new Map<string, string>();
		const details = await this.itemDetails.all();

		for (const detail of details) {
			const label =
				(await detail.locator("dt, .detail-label").textContent()) || "";
			const value =
				(await detail.locator("dd, .detail-value").textContent()) || "";
			detailsMap.set(label.trim(), value.trim());
		}

		return detailsMap;
	}
}

import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page object for the home page
 */
export class HomePage extends BasePage {
	readonly highlightArticles: Locator;
	readonly featuredSection: Locator;

	constructor(page: Page) {
		super(page);
		this.highlightArticles = page.locator(".highlights-section .artwork-card");
	}

	/**
	 * Navigates to the home page
	 */
	async goto() {
		await this.page.goto("/");
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Clicks on a highlighted article by its index
	 * @param index The index of the article to click (0-based)
	 */
	async clickHighlightArticle(index: number) {
		await this.highlightArticles.nth(index).click();
		// await locator .artwork-detail
		await this.page.waitForLoadState("networkidle");
		await this.page.waitForSelector(".artwork-detail");
	}

	/**
	 * Gets the number of highlighted articles displayed
	 * @returns The count of highlighted articles
	 */
	async getHighlightArticlesCount() {
		return await this.highlightArticles.count();
	}
}

import { Page, Locator } from "@playwright/test";

/**
 * Base page object with common elements and methods
 */
export class BasePage {
	readonly page: Page;
	readonly quickSearchInput: Locator;
	readonly quickSearchButton: Locator;
	readonly navigationLinks: Locator;

	constructor(page: Page) {
		this.page = page;
		this.quickSearchInput = page.getByPlaceholder("Recherche rapide...");
		this.quickSearchButton = page.getByRole("button", { name: "Rechercher" });
		this.navigationLinks = page.getByRole("navigation").getByRole("link");
	}

	/**
	 * Performs a quick search
	 * @param query The search query
	 */
	async performQuickSearch(query: string) {
		await this.quickSearchInput.fill(query);
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Navigates to the advanced search page
	 */
	async goToAdvancedSearch() {
		await this.page.getByRole("link", { name: "Recherche avancée" }).click();
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Navigates to the home page
	 */
	async goToHomePage() {
		await this.page.goto("/");
	}
}

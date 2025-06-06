import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page object for the advanced search page
 */
export class AdvancedSearchPage extends BasePage {
	readonly departmentSelect: Locator;
	readonly dateFromInput: Locator;
	readonly dateToInput: Locator;
	readonly textSearchInput: Locator;
	readonly tagsInput: Locator;
	readonly artistInput: Locator;
	readonly mediumSelect: Locator;
	readonly searchButton: Locator;
	readonly searchResults: Locator;

	constructor(page: Page) {
		super(page);
		this.departmentSelect = page.getByLabel("Département");
		this.dateFromInput = page.getByLabel("Date de début");
		this.dateToInput = page.getByLabel("Date de fin");
		this.textSearchInput = page.getByLabel("Mots-clés");
		this.searchButton = page
			.locator('form[name="advanced-search"]')
			.getByRole("button", { name: "Rechercher" });
		this.searchResults = page.locator(".artwork-card");
	}

	/**
	 * Navigates to the advanced search page
	 */
	async goto() {
		await this.page.goto("/advanced-search");
		await this.page.waitForLoadState("networkidle");
	}

	/**
	 * Performs an advanced search with the specified parameters
	 * @param params The search parameters
	 */
	async performAdvancedSearch(params: {
		department?: string;
		dateFrom?: string;
		dateTo?: string;
		textSearch?: string;
		tags?: string;
		artist?: string;
		medium?: string;
	}) {
		// Ensure we're working with the advanced-search form
		if (params.department) {
			await this.departmentSelect.selectOption(params.department);
		}
		if (params.dateFrom) {
			await this.dateFromInput.fill(params.dateFrom);
		}
		if (params.dateTo) {
			await this.dateToInput.fill(params.dateTo);
		}
		if (params.textSearch) {
			await this.textSearchInput.fill(params.textSearch);
		}
		await this.searchButton.click();
		await this.page.waitForLoadState("networkidle");
		await expect(this.page.getByText("Résultats de Recherche")).toBeVisible({
			timeout: 15000,
		});
	}

	/**
	 * Gets the number of search results
	 * @returns The count of search results
	 */
	async getResultsCount() {
		return await this.searchResults.count();
	}

	/**
	 * Clicks on a search result by its index
	 * @param index The index of the result to click (0-based)
	 */
	async clickSearchResult(index: number) {
		await this.searchResults.nth(index).click();
	}
}

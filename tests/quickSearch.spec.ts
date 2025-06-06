import { test, expect } from "@playwright/test";
import { BasePage } from "./pages/BasePage";
import { HomePage } from "./pages/HomePage";
import { ItemDetailPage } from "./pages/ItemDetailPage";

/**
 * Tests for the quick search functionality (4 points)
 */
test.describe("Quick Search Feature (4pts)", () => {
	test("[1pt] should display search results when performing a quick search", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		// Perform a quick search
		await homePage.performQuickSearch("Monet");

		// Check that search results are displayed
		await expect(page.getByText("The Monet Family")).toBeVisible();
		const resultsCount = await page.locator(".quick-search-item").count();
		expect(resultsCount).toBeGreaterThan(0);
	});

	test("[1pt] should navigate to item detail from search results", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		// Perform a search
		await homePage.performQuickSearch("Monet");

		// Click on the first search result
		await expect(page.getByText("The Monet Family")).toBeVisible();
		await page.getByText("The Monet Family").click();

		// Verify we're on an item detail page with correct content
		const itemDetailPage = new ItemDetailPage(page);
		await expect(itemDetailPage.itemTitle).toBeVisible();
	});

	test("[1pt] quick search should be available on all pages", async ({ page }) => {
		// Check home page
		const homePage = new HomePage(page);
		await homePage.goto();
		await expect(homePage.quickSearchInput).toBeVisible();

		// Check advanced search page
		await homePage.goToAdvancedSearch();
		await expect(homePage.quickSearchInput).toBeVisible();

		// Check item detail page (navigate to a known item)
		await page.goto("/object/229770"); // Replace with a valid item ID
		await expect(homePage.quickSearchInput).toBeVisible();
	});

	test("[1pt] should show appropriate message when no results are found", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		// Perform a search with unlikely results
		await homePage.performQuickSearch("xyznonexistentartifact123456789");

		// Check for no results message
		const noResultsMessage = page.getByText("Aucun résultat trouvé");
		await expect(noResultsMessage).toBeVisible();
	});
});

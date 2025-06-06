import { test, expect } from "@playwright/test";
import { AdvancedSearchPage } from "./pages/AdvancedSearchPage";
import { ItemDetailPage } from "./pages/ItemDetailPage";

/**
 * Tests for the advanced search functionality (4 points)
 */
test.describe("Advanced Search Feature (4pts)", () => {
	test("[0.5pt] should allow searching by department", async ({ page }) => {
		const advancedSearchPage = new AdvancedSearchPage(page);
		await advancedSearchPage.goto();

		// Search by department
		await advancedSearchPage.performAdvancedSearch({
			department: "Peintures Européennes",
		});

		// Check that results are displayed
		const resultsCount = await advancedSearchPage.getResultsCount();
		expect(resultsCount).toBeGreaterThan(0);
	});

	test("[0.5pt] should allow searching by date range", async ({ page }) => {
		const advancedSearchPage = new AdvancedSearchPage(page);
		await advancedSearchPage.goto();

		// Search by date range
		await advancedSearchPage.performAdvancedSearch({
			dateFrom: "1800",
			dateTo: "1900",
		});

		// Check that results are displayed
		const resultsCount = await advancedSearchPage.getResultsCount();
		expect(resultsCount).toBeGreaterThan(0);
	});

	test("[1pt] should allow searching by multiple criteria", async ({ page }) => {
		const advancedSearchPage = new AdvancedSearchPage(page);
		await advancedSearchPage.goto();

		// Search by multiple criteria
		await advancedSearchPage.performAdvancedSearch({
			dateFrom: "1700",
			dateTo: "1900",
			textSearch: "rodin",
		});

		// Check that results are displayed
		const resultsCount = await advancedSearchPage.getResultsCount();
		expect(resultsCount).toBeGreaterThan(0);

		// Navigate to first result
		await advancedSearchPage.clickSearchResult(0);

		// Verify we're on an item detail page
		const itemDetailPage = new ItemDetailPage(page);
		await expect(itemDetailPage.itemTitle).toBeVisible();
	});

	test("[1pt] should allow searching by text", async ({ page }) => {
		const advancedSearchPage = new AdvancedSearchPage(page);
		await advancedSearchPage.goto();

		// Search by text
		await advancedSearchPage.performAdvancedSearch({
			textSearch: "portrait",
		});

		// Check that results are displayed
		const resultsCount = await advancedSearchPage.getResultsCount();
		expect(resultsCount).toBeGreaterThan(0);

		// Check that text search is reflected in results
		await expect(advancedSearchPage.searchResults.first()).toContainText(
			"Portrait",
		);
	});

	test("[1pt] should show appropriate message when no results match criteria", async ({
		page,
	}) => {
		const advancedSearchPage = new AdvancedSearchPage(page);
		await advancedSearchPage.goto();

		// Search with very specific criteria unlikely to match
		await advancedSearchPage.performAdvancedSearch({
			department: "Photographies",
			dateFrom: "1500",
			dateTo: "1510",
			textSearch: "impossibletext",
			artist: "nonexistentartist",
			tags: "impossibletag",
		});

		// Check for no results message
		const noResultsMessage = page.getByText(
			"Aucun résultat trouvé. Essayez d'ajuster vos critères de recherche.",
		);
		await expect(noResultsMessage).toBeVisible();
	});
});

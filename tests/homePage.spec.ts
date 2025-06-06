import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { ItemDetailPage } from "./pages/ItemDetailPage";

/**
 * Tests for the main/index page (4 points)
 */
test.describe("Main/Index Page (4pts)", () => {
	test("[1.5pts] should display highlighted articles on the home page", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		// Check that highlighted articles are displayed
		const articlesCount = await homePage.getHighlightArticlesCount();
		expect(articlesCount).toBeGreaterThan(0);
	});

	test("[1.5pts] should navigate to item detail when clicking on a highlighted article", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		// Click on the first highlighted article
		await homePage.clickHighlightArticle(0);

		// Verify we're on an item detail page
		const itemDetailPage = new ItemDetailPage(page);
		expect(itemDetailPage.itemTitle).toBeVisible();
	});

	test("[1pt] should display highlight section title on the home page", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		// Check for section title
		const sectionTitle = page
			.getByRole("heading")
			.filter({ hasText: "Oeuvres en vedette" });
		await expect(sectionTitle).toBeVisible();
	});
});

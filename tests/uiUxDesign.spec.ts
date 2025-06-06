import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { AdvancedSearchPage } from "./pages/AdvancedSearchPage";
import { ItemDetailPage } from "./pages/ItemDetailPage";

/**
 * Tests for the global design including UI/UX (4 points)
 */
test.describe("Global Design (UI/UX) (4pts)", () => {
	test("[1.5pts] should have consistent navigation across all pages", async ({
		page,
	}) => {
		// Check navigation on home page
		const homePage = new HomePage(page);
		await homePage.goto();

		const navLinksCount = await homePage.navigationLinks.count();
		expect(navLinksCount).toBeGreaterThan(1);

		// Check navigation on advanced search page
		await homePage.goToAdvancedSearch();
		const advancedSearchNavLinksCount = await homePage.navigationLinks.count();
		expect(advancedSearchNavLinksCount).toBe(navLinksCount);

		// Check navigation on item detail page
		const itemDetailPage = new ItemDetailPage(page);
		await itemDetailPage.gotoItem("123456"); // Replace with a valid item ID
		const itemDetailNavLinksCount = await homePage.navigationLinks.count();
		expect(itemDetailNavLinksCount).toBe(navLinksCount);
	});

	test("[1.5pts] should have accessible form controls", async ({ page }) => {
		const advancedSearchPage = new AdvancedSearchPage(page);
		await advancedSearchPage.goto();

		// Check that form controls have labels
		await expect(advancedSearchPage.departmentSelect).toBeVisible();

		await expect(advancedSearchPage.dateFromInput).toBeVisible();

		// Check focus states
		await advancedSearchPage.departmentSelect.focus();
		await page.keyboard.press("Tab");

		// The next element should be focused
		const focusedElement = await page.evaluate(
			() =>
				document.activeElement?.getAttribute("aria-label") ||
				document.activeElement?.id,
		);
		expect(focusedElement).not.toBe("");
	});

	test("[1pt] should have appropriate visual hierarchy and typography", async ({
		page,
	}) => {
		const homePage = new HomePage(page);
		await homePage.goto();

		// Check heading hierarchy
		const h1Count = await page.locator("h1").count();
		expect(h1Count).toBe(1); // Only one main heading

		const h2Count = await page.locator("h2").count();
		expect(h2Count).toBeGreaterThan(0); // Section headings

		// Check for consistent typography
		const fontFamily = await page.evaluate(() => {
			return window.getComputedStyle(document.body).fontFamily;
		});

		expect(fontFamily).not.toBe("");
	});
});

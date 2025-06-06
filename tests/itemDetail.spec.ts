import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { ItemDetailPage } from "./pages/ItemDetailPage";

/**
 * Tests for the item detail page (4 points)
 */
test.describe("Item Detail Page (4pts)", () => {
	test("[2pts] should display item details when navigating to a specific item", async ({
		page,
	}) => {
		// Navigate to a known item
		const itemDetailPage = new ItemDetailPage(page);
		await itemDetailPage.gotoItem("229770"); // Replace with a valid item ID

		// Check that item details are displayed
		await expect(itemDetailPage.itemTitle).toBeVisible();
		await expect(itemDetailPage.itemImage).toBeVisible();
		await expect(itemDetailPage.itemDepartment).toBeVisible();
	});

	test("[2pts] should display comprehensive information about the item", async ({
		page,
	}) => {
		// Navigate to a known item
		const itemDetailPage = new ItemDetailPage(page);
		await itemDetailPage.gotoItem("229770"); // Replace with a valid item ID

		// Verify essential details are present
		await expect(page.getByText("Hunting and fishing scenes")).toBeVisible();
		await expect(page.getByText("Robert Jones")).toBeVisible();
		await expect(page.getByText("1769", { exact: true })).toBeVisible();
		await expect(
			page.getByText("European Sculpture and Decorative Arts"),
		).toBeVisible();
		await expect(page.getByText("Linen and cotton")).toBeVisible();
	});
});

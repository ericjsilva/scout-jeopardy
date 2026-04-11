import { expect, test } from "@playwright/test";

test.describe("Scout Jeopardy Game Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/scout-jeopardy-web.html");
  });

  test("should initialize game state correctly", async ({ page }) => {
    await expect(page).toHaveTitle(/Scout Game Show Jeopardy/);

    // Wait for select element to be visible
    const teamsSelect = page.locator("#teams");
    await expect(teamsSelect).toBeVisible();
  });

  test("should start game and show board", async ({ page }) => {
    // Select 2 patrols
    await page.selectOption("#teams", "2");
    await page.click('input[value="Start"]');

    // Check board is visible
    const board = page.locator("#game");
    await expect(board).toBeVisible();

    // Check scoreboard is visible
    const scoreboard = page.locator("#stats");
    await expect(scoreboard).toBeVisible();
    await expect(scoreboard).toContainText("Patrol 1");
    await expect(scoreboard).toContainText("Patrol 2");
  });

  test("should open question modal, mark as used, and add points", async ({ page }) => {
    await page.selectOption("#teams", "1");
    await page.click('input[value="Start"]');

    // Target the first 100 point cell by ID so it doesn't shift when class changes
    const cell = page.locator("#tq00");
    await expect(cell).toContainText("100");

    // Click and verify modal opens
    await cell.click();

    const modal = page.locator("#simplemodal-container");
    await expect(modal).toBeVisible();

    const promptAnswer = page.locator("#prompt-answer");
    await expect(promptAnswer).not.toBeEmpty();

    // Click Correct Response
    await page.click("text=Correct Response");

    const promptQuestion = page.locator("#prompt-question");
    await expect(promptQuestion).toBeVisible();
    await expect(promptQuestion).not.toBeEmpty();

    // Click Continue to close modal
    await page.click("text=Continue");

    // Verify cell is now marked dirty (visual change)
    await expect(cell).toHaveClass(/dirty/);
    await expect(cell).not.toHaveClass(/clean/);

    // Ensure no modal is open
    await expect(modal).not.toBeVisible();

    // Test awarding points via scoreboard
    const teamScore = page.locator("#team0"); // Team 1 ID
    await expect(teamScore).toHaveText("0");

    // We revealed a 100 point question, clicking + adds those points
    await page.locator(".add-points").first().click();
    await expect(teamScore).toHaveText("100");
  });

  test("no answer should mark cell used without awarding points", async ({ page }) => {
    await page.selectOption("#teams", "1");
    await page.click('input[value="Start"]');

    const cell = page.locator("#tq00");
    await cell.click();

    const modal = page.locator("#simplemodal-container");
    await expect(modal).toBeVisible();

    // Click No Answer directly
    await page.click("text=No Answer");

    // Verify cell is dirty
    await expect(cell).toHaveClass(/dirty/);

    // Verify score is still 0
    const teamScore = page.locator("#team0");
    await expect(teamScore).toHaveText("0");
  });
});

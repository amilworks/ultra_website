import { expect, test } from "@playwright/test";

test("homepage presents the release site shell and follows system dark mode", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "BisQue Ultra" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Read the white paper/i })).toBeVisible();
  await expect(page.getByText(/Created within the UCSB Vision Research Lab/i)).toBeVisible();
  await expect(page.getByTestId("theme-toggle")).toHaveCount(0);
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.locator(".story-tile-large .story-tile-image")).toBeVisible();

  const primaryButton = page.getByRole("link", { name: /Read the white paper/i });
  await expect(primaryButton).toHaveCSS("color", "rgb(17, 17, 19)");
});

test("white paper route renders content and on-page navigation", async ({ page }) => {
  await page.goto("/news/bisque-ultra");

  await expect(page.getByRole("heading", { level: 1, name: "BisQue Ultra", exact: true })).toBeVisible();
  await expect(
    page.getByText(/It is not a replacement for BisQue\. It is a new working surface built on top of BisQue\./i)
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: /Why the runtime is Agno, but lean/i })).toBeVisible();

  const jumpMenu = page.locator("[data-article-jump]");
  await expect(jumpMenu).toHaveAttribute("data-visible", "false");
  await expect(jumpMenu).not.toHaveAttribute("open", "");

  await page.evaluate(() => {
    window.scrollTo(0, 1100);
  });

  await expect(jumpMenu).toHaveAttribute("data-visible", "true");
  await expect(jumpMenu).not.toHaveAttribute("open", "");
  await jumpMenu.locator(".article-jump-summary").click();
  await expect(jumpMenu).toHaveAttribute("open", "");
  await expect(jumpMenu.getByRole("link", { name: /Why the runtime is Agno, but lean/i })).toBeVisible();
});

test("news index and a follow-up post both render", async ({ page }) => {
  await page.goto("/news");
  await expect(page.getByRole("heading", { name: /White papers, platform foundations/i })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /BisQue Platform: storage, visualization, analysis, and extensibility/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Platform foundation: what BisQue Ultra builds on/i })).toBeVisible();

  await page.goto("/news/platform-foundation");
  await expect(page.getByRole("heading", { name: /Platform foundation: what BisQue Ultra builds on/i })).toBeVisible();
  await expect(page.getByText(/BisQue is a web-based platform designed for scientific imaging/i)).toBeVisible();
});

test("BisQue platform feature article renders docs imagery and platform links", async ({ page }) => {
  await page.goto("/news/bisque-platform-features");

  await expect(
    page.getByRole("heading", { name: /BisQue Platform: storage, visualization, analysis, and extensibility/i })
  ).toBeVisible();
  await expect(
    page.getByText(/BisQue was built to resist that drift\./i)
  ).toBeVisible();
  await expect(page.getByAltText(/official bisque documentation banner/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Data storage/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Install Python BQAPI/i })).toBeVisible();
});

test("frontend showcase article renders embedded interface demos", async ({ page }) => {
  await page.goto("/news/frontend-showcase");

  await expect(
    page.getByRole("heading", { name: /Why the BisQue Ultra frontend looks the way it does/i })
  ).toBeVisible();
  await expect(
    page.getByText(/A shell that orients the user without competing with the work/i)
  ).toBeVisible();
  await expect(page.getByText(/A control surface that makes priority obvious/i)).toBeVisible();
  await expect(page.getByText(/Language and proof stay close to each other/i)).toBeVisible();
});
